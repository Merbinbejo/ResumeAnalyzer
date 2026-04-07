from fastapi import FastAPI,Depends,HTTPException,UploadFile,File,Form
from database import engine
import models
from database import SessionLocal
from typing import Annotated
from sqlalchemy.orm import Session
import auth
from auth import get_current_user
import nltk
from pdf_reader import get_pdf
from nltkmodel import extract_similarity,extract_similarity_jobdata
import schema
from fastapi.middleware.cors import CORSMiddleware



models.Base.metadata.create_all(bind=engine)

app=FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]

)

app.include_router(auth.router)

def get_db():
    db=SessionLocal()
    try:
        yield db
    finally:
        db.close()

db_dependency=Annotated[Session,Depends(get_db)]
user_dependency=Annotated[models.User,Depends(get_current_user)]

@app.get("/profile")
def profile(user:user_dependency,db:db_dependency):
    if not user:
        raise HTTPException(status_code=401,detail="User Not Found")
    return user

@app.post("/upload_resume")
async def upload_pdf( user:user_dependency,job_description:str = Form(schema.JobDescription),file:UploadFile=File(...)):
    file_bytes=await file.read()
    pdf_text=get_pdf(file_bytes)
    matching_skills=set(extract_similarity([job_description],[pdf_text]))
    job_skills=set(extract_similarity_jobdata([job_description]))
    score=len(matching_skills)/len(job_skills)*100
    missing_skills = list(set(job_skills) - set(matching_skills))
    

    return {
        "match_skills":matching_skills,
            "score":score,
            "missing_skills":missing_skills
            }

@app.get("/getdata")
def get_data(db:db_dependency):
    data=db.query(models.User).all()
    return data

   

