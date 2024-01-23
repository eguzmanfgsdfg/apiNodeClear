
######################################################################
#MODELO ML DE PRUEBA 
######################################################################

#-------------------
#CARGA DE MODELOS
#-------------------

print("Ego 0")
#Librerias
import numpy as np
import sys
#print("Ego 0.0")
import torch as torch

#print("Ego 0")
#LOAD EL ENCODER GUARDADO
from sklearn.preprocessing  import LabelEncoder

#print("Ego 0.4")
import numpy as np

#print("Ego 1")
le = LabelEncoder()

#print("Ego 1.2")
le.classes_ = np.load('C:\\Users\\EsdrasGuzman\\Desktop\\Risk2023128\\apiNodeClear\\python\\classes_.npy', allow_pickle=True)

#print("Ego 2")
# Model class
model = torch.load('C:\\Users\\EsdrasGuzman\\Desktop\\Risk2023128\\apiNodeClear\\python\\full_model_scripted_.pt')

#print("Ego 2.1")
model.eval()

#print("Ego 1")
#DATOS DE ENTRADA
input =[[]]
#input =   '[['+  sys.argv[1].split(',') + ']]'#[['215afakhjda76382904',	'3265709.0',	'9048689.0',	'0',	111123.45,	'0',	'484',	'MSI',	'3',	'45255.6527893519',	'CHIP',	'PB452544',	'[BZP173]UTS_8457239_BR',	'BANREGIO_TPV',	'4000123412341230',	'2024',	'12',	'7012334455',	'PAGO TACOS',	'TINTORERIA 1',	'SALE',	'402766',	'US',	'32750',	'Longwood',	'FL',	'CREDIT',	'MasterCard',	'5399',	'00',	'PRE',	'0',	'123.45',	'josele@gmail.com',	'Josele',	'Cruz',	'PIN',	'12345566']]
#input =  [['215afakhjda76382904',	'3265709.0',	'9048689.0',	'0',	111123.45,	'0',	'484',	'MSI',	'3',	'45255.6527893519',	'CHIP',	'PB452544',	'[BZP173]UTS_8457239_BR',	'BANREGIO_TPV',	'4000123412341230',	'2024',	'12',	'7012334455',	'PAGO TACOS',	'TINTORERIA 1',	'SALE',	'402766',	'US',	'32750',	'Longwood',	'FL',	'CREDIT',	'MasterCard',	'5399',	'00',	'PRE',	'0',	'123.45',	'josele@gmail.com',	'Josele',	'Cruz',	'PIN',	'12345566']]
#print('>>',sys.argv[1].split(",")[0],'<<')
#print('>>',sys.argv[1].count(","),'<<')
for i in range(0, sys.argv[1].count(",")+1, 1):
    input[0].append(sys.argv[1].split(',')[i].replace('\'',''))
#input[0].append(sys.argv[1].split(',')[1].replace('\'',''))
#print('>>',input,'<<')
#print('input)

#-------------------
#PRUEBA DEL MODELO
#-------------------
from sklearn.metrics import accuracy_score

#print("Ego 2")
def softmax(x): #Función para establecer la salida como función de probabilidad
    return torch.exp(x) / torch.exp(x).sum(axis=-1,keepdims=True)

def fit(model, dataset, scheduler=None, log_each=1, weight_decay=0):

    #TRANSFORMACIÓN A VARIABLES CATEGÓRICAS AGRUAPADAS
    monto =float( input[0][4].replace('\'',''))
    if (monto <= 50): rango = 'tier_1_50'
    elif (monto > 50) & (monto <= 250): rango = 'tier_2_250'
    elif (monto > 250) & (monto <= 500) : rango = 'tier_3_500'
    elif (monto > 500) & (monto <= 1000): rango = 'tier_4_1000'
    elif (monto > 1000) & (monto <= 1500): rango = 'tier_5_1500'
    elif (monto > 1500) & (monto <= 2000): rango = 'tier_6_2000'
    elif (monto > 2000) & (monto <= 2500): rango = 'tier_7_2500'
    elif (monto > 2500) & (monto <= 5000): rango = 'tier_8_5000'
    elif  (monto > 5000): rango = 'tier_9_5001'

    #SELECCIÓN DE CAMPOS PARA MODELO ML
    X = [[rango,input[0][1],input[0][2],input[0][12],input[0][22],input[0][23],input[0][24],input[0][25],input[0][26],input[0][27]]]

    #ACPLICACIÓN DEL MODELO
    model.eval()
    with torch.no_grad():
        X = np.array(X)
        X = le.transform(X[0]) #Transformación de datos
        X = torch.tensor(X).float().view(-1,10).to(torch.int64)
        y_pred = model(X)
        ypred_prob = softmax(model(X))
        y_predfin = torch.argmax(softmax(y_pred), axis=1)
    return {'y_pred':y_predfin, 'ypred_prob':ypred_prob}
 #return {"zsfasfg"}

#SE EVALUAN LOS DATOS CON EL MODELO YA GUARDADO
hist_adam = fit(model,input)

#print('Valores predichos')
#print(hist_adam['y_pred'])

#print('['+y_predfin+ypred_prob+']')
#print(y_predfin)
#print(len(sys.argv))
#print( sys.argv[1])

#print(input2)
print(hist_adam['ypred_prob'][0])
#aux=hist_adam['ypred_prob'][0]
#print(aux)
#print((''+aux).replace('tensor','',0))
#print(hist_adam)