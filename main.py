import string
from pydantic import BaseModel
from fastapi import FastAPI
import pickle
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
from sklearn.tree import DecisionTreeClassifier
from sklearn.model_selection import train_test_split, cross_val_score
from statistics import mean

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

class Symptoms(BaseModel):
    symptoms: str

@app.on_event("startup")
def load_model():
    global model,dataset,X,Y,scores,dt,df_comb,df_norm
    print(1)
    model = pickle.load(open("model_dt.pkl", "rb"))
    dataset = pickle.load(open("dataset_symptoms_list.pkl", "rb"))
    df_comb = pd.read_csv("dis_sym_dataset_comb.csv") # Disease combination
    df_norm = pd.read_csv("dis_sym_dataset_norm.csv") # Individual Disease
    X = df_comb.iloc[:, 1:]
    Y = df_comb.iloc[:, 0:1]
    dt = DecisionTreeClassifier()
    dt = dt.fit(X, Y)
    scores = cross_val_score(dt,X,Y,cv=5)

@app.get('/')
async def index():
    print("called here")
    return {'message': 'This is the homepage of the API '}


@app.post('/predict')
async def get_diseases_probability(data: Symptoms):
    received = data.dict()
    print(received)
    symptoms = received['symptoms']
    symptoms = symptoms.split(',')
    print(symptoms)

    sample_x = [0 for x in range(0,len(dataset))]
    for val in symptoms:
        sample_x[dataset.index(val)]=1
    pred_names = model.predict_proba([sample_x])
    print(pred_names,type(Y))
    k = 10
    diseases = list(set(Y['label_dis']))
    print(diseases)
    diseases.sort()
    topk = pred_names[0].argsort()[-k:][::-1]
    print(topk)
    print("hello till here done")


    topk_dict = {}
    # Show top 10 highly probable disease to the user.
    for idx,t in  enumerate(topk):
        match_sym=set()
        row = df_norm.loc[df_norm['label_dis'] == diseases[t]].values.tolist()
        row[0].pop(0)

        for idx,val in enumerate(row[0]):
            if val!=0:
                match_sym.add(dataset[idx])
        prob = (len(match_sym.intersection(set(symptoms)))+1)/(len(set(symptoms))+1)
        prob *= mean(scores)
        topk_dict[t] = prob
    j = 0
    topk_index_mapping = {}
    Probable_diseases = []
    topk_sorted = dict(sorted(topk_dict.items(), key=lambda kv: kv[1], reverse=True))
    for key in topk_sorted:
      diseases_dict = {}
      prob = topk_sorted[key]*100
      print(str(j) + " Disease name:",diseases[key], "\tProbability:",str(round(prob, 2))+"%")
      topk_index_mapping[j] = key
      diseases_dict[diseases[key]] = str(round(prob, 2))+"%"
      Probable_diseases.append(diseases_dict)
      j += 1
    print(Probable_diseases)
    return {'prediction': Probable_diseases}
    # return {'data':'data'}