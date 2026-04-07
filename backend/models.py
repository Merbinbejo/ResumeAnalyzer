from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column,String,Integer

Base=declarative_base()

class User(Base):
    __tablename__="users"

    id=Column(Integer,primary_key=True,index=True)
    username=Column(String,unique=True)
    email=Column(String,unique=True)
    password=Column(String)