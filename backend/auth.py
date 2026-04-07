from dotenv import load_dotenv
from fastapi import APIRouter,Depends,HTTPException
from fastapi.security import OAuth2PasswordBearer,OAuth2PasswordRequestForm
from passlib.context import CryptContext
from jose import jwt,JWSError
import os
import schema
from sqlalchemy.orm import Session
from database import SessionLocal
from typing import Annotated
import models
from starlette import status
from datetime import datetime,timedelta
load_dotenv()

router=APIRouter(
    prefix='/auth',
    tags=["auth"]
)

SECRET_KEY=os.getenv("SECRET_KEY")
ALGORITHM=os.getenv("ALGORITHM")

pwd_context=CryptContext(schemes=["bcrypt"],deprecated="auto")

oauth2_bearer=OAuth2PasswordBearer(tokenUrl="/auth/token")

def get_db():
    db=SessionLocal()
    try:
        yield db
    finally:
        db.close()

db_dependency=Annotated[Session,Depends(get_db)]

@router.post("/register")
def create_user(user:schema.userRegister,db:db_dependency):
    userInfo=db.query(models.User).filter(models.User.username==user.firstname+user.lastname).first()
    existing_user=db.query(models.User).filter(models.User.email==user.email).first()
    if userInfo:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,detail="User Already Exist")
    elif existing_user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,detail="Email Already Exist")
    userRegister=models.User(
        username=user.firstname+user.lastname,
        email=user.email,
        password=pwd_context.hash(user.password)
    )
    db.add(userRegister)
    db.commit()
    db.refresh(userRegister)
    return {"message":"Account Created Successful"}

def authenticate_user(username:str,password:str,db):
    user=db.query(models.User).filter(models.User.username==username).first()
    if not user:
        return False
    if not pwd_context.verify(password,user.password):
        return False
    return user

def get_token(user_id:int,username:str,expire_delta:timedelta):
    encode={"sub":username,"id":user_id}
    expire=datetime.utcnow()+expire_delta
    encode.update({"exp":expire})
    return jwt.encode(encode,SECRET_KEY,algorithm=ALGORITHM)

@router.post("/token",response_model=schema.token)
def create_access_token(formdata:Annotated[OAuth2PasswordRequestForm,Depends()],db:db_dependency):
    user=authenticate_user(formdata.username,formdata.password,db)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,detail="Invalid User")
    token=get_token(user.id,user.username,timedelta(minutes=30))
    return {"access_token":token,"token_type":"bearer"}

def get_current_user(token:Annotated[str,Depends(oauth2_bearer)]):
    try:
        payload=jwt.decode(token,SECRET_KEY,algorithms=[ALGORITHM])
        username=payload.get("sub")
        id=payload.get("id")
        if username is None or id is None:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,detail="Coudnt find User")
        return {"username":username,"id":id}
    except JWSError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,detail="Coudnt validiate user")
