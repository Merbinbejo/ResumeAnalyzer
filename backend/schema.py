from pydantic import BaseModel,Field

class userRegister(BaseModel):
    firstname:str
    lastname:str
    email:str
    password:str

class token(BaseModel):
    access_token:str
    token_type:str

class JobDescription(BaseModel):
    Description:str=Field(...,max_length=1000)