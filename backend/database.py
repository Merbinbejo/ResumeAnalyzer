from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

DATABASEURL="postgresql://postgres:7305840508@localhost:5432/Signup"

engine=create_engine(DATABASEURL)

SessionLocal=sessionmaker(autoflush=False,autocommit=False,bind=engine)
