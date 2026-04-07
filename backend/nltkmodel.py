import re
from nltk.stem import PorterStemmer
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
from nltk import word_tokenize
from nltk import pos_tag

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity


remove_words = {
    "engineer", "engineering", "design", "designing", "work", "working",
    "responsible", "experienced", "experience", "knowledge", "familiar",
    "ability", "team", "good", "strong", "project", "projects",
    "role", "candidate", "looking", "skill", "skills", "added", "advantage",
    "familiarity", "foundation", "join", "include", "collaboration",
    "problem", "service", "building", "passionate", "development",
    "analysis", "junior", "language", "processing", "library", "framework",
    "web", "notebook", "document", "advancement", "cross", "platform",
    "documentation", "tool", "structure", "qualification", "participate",
    "integrate", "excellent", "quantitative", "job", "computer", "assist",
    "initiative", "review", "proficiency", "functional", "process", "version",
    "eagerness", "experiment", "research", "code", "field", "system",
    "collection", "key", "stay", "understanding", "perform", "solution",
    "fundamental", "desire", "exploratory", "teamwork", "ideal", "internship",
    "align", "science", "preparation", "exposure", "business", "software",
    "solve", "year", "communication", "responsibility", "prepare", "control",
    "help", "adapt", "goal", "monitor", "evaluate", "scientist", "train",
    "cleaning", "description", "collaborate", "deploy", "experimental",
    "position", "need", "analyze", "mentorship", "entry", "career",
    "enhance", "master", "level", "competition", "tune", "translate",
    "maintain", "programming", "predictive", "retrain", "build", "workflow",
    "management", "production", "intelligent", "generative", "scalability",
    "modeling", "manage", "task", "maintaining", "trend", "technique",
    "paper", "implementing", "report", "focus", "count", "portfolio",
    "apply", "clean", "collaborative", "user", "professional", "evolve",
    "workable", "fast", "time", "end", "self", "core", "proactive",
    "mindset", "ownership", "optimize", "create", "product", "practical",
    "lifecycle", "translating", "vital", "matter", "raw", "thinking",
    "transform", "crucial", "insight", "mandatory","understand","area",
    "quality","improvement","integrating","concept","integration","identify",
    "input","guidance","collect","requirement","meaningful","comprehensive",
    "network","breakdown","verbal","background","automate","transformation","functionality",
    "contribute","handling","modular","educational","methodology","extract","relevant","willingness","develop",
    "opportunity","driven","principle","dynamic","gain","source","fairness","efficiency","artificial","basic","relevance","staff",
    "proactivity", "strategy","finding","issue","post","resolve","appropriate"
    "assistance","non","date","scrum","explain","specification","implementation","troubleshoot","stakeholder","participation","title",
    "validation","demand", "algebra", "industry", "complex", "capability", "cv", "probability", "remain",
"statistic", "outlook", "linear", "objective", "domain", "researcher", "depth", "constructing", "vision","implement", "pipeline", "infrastructure", "cloud", "deployment",
"use", "maintenance", "coding", "interaction", "deploying","application", "debug","member","write","appropriate","turn","organize","brainstorming","monitoring","meeting","containerization","behavioral","ready","competency",
"alongside","select","refine","drive","play","relevancy","innovation","outcome","edge","passion","duty","manager","consistency","offer","wellness",
"insurance","expert","regular","activity","health","hybrid","remote","option","program","perk","arrangement"
}
REMOVE_WORDS = remove_words
#resume and job description lemmatization
def extract_words(doc):
    corpus = []
    lemmatizer = WordNetLemmatizer()
    stop_words = set(stopwords.words("english"))

    for data in doc:
        review = re.sub("[^a-zA-Z]", " ", data)
        review = review.lower()
        words = review.split()

        lemmatize_words = [lemmatizer.lemmatize(word) for word in words if word not in stop_words]
        corpus.append(" ".join(lemmatize_words))

    return corpus

#resume and job description lemmatization
def tag_extraction(sentence):
    storage=[]
    for i in sentence:
        tokenized=word_tokenize(i)
        tag=pos_tag(tokenized)
        for j in range(0,len(tag)):
            if tag[j][1]=="NNP" or tag[j][1]=="NN":
                storage.append(tag[j][0])
    final_job = [word for word in storage if word not in REMOVE_WORDS]
    return final_job

#job and resume Matching
def extract_similarity(doc, text):

    resume_clean = " ".join(extract_words(text))
    job_clean = " ".join(extract_words(doc))
    
    data = [resume_clean, job_clean]

    vectorizer=TfidfVectorizer(ngram_range=(1,2),stop_words='english',token_pattern=r'\b[a-zA-Z][a-zA-Z]+\b')
    tfidf_matrix =vectorizer.fit_transform(data)

    similarity=cosine_similarity(tfidf_matrix)

    features=vectorizer.get_feature_names_out()

    resume_vec = tfidf_matrix[0].toarray()[0]
    job_vec = tfidf_matrix[1].toarray()[0]

    common_words=[]
    for i in range(len(features)):
        if resume_vec[i]>0 and job_vec[i]>0:
            common_words.append(features[i])

    extracted=tag_extraction(common_words)
    final_skills = [word for word in extracted if word not in REMOVE_WORDS]

    return final_skills

#job description
def extract_similarity_jobdata(data):
    job_clean = " ".join(extract_words(data))
    vectorizer=TfidfVectorizer(ngram_range=(1,2))
    tfidf_matrix =vectorizer.fit_transform([job_clean])

    features=vectorizer.get_feature_names_out()

    resume_vec = tfidf_matrix[0].toarray()[0]

    common_words=[]
    for i in range(len(features)):
        if resume_vec[i]>0:
            common_words.append(features[i])
    extracted=tag_extraction(common_words)
    final_skills = [word for word in extracted if word not in REMOVE_WORDS]

    return final_skills