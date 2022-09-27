# -*- coding: utf-8 -*-
"""train_covid_model.ipynb

Automatically generated by Colaboratory.

Original file is located at
    https://colab.research.google.com/drive/1lQt0wv2tdeXIi9_4sIHDSjiT1EWDaqiW
"""
import tensorflow as tf
import tensorflowjs as tfjs
from keras import layers
from vit import ViT
from load_data import create_file_list, create_data_from_list
from training_loop import train_model

# @title Create CNN
model = tf.keras.models.Sequential()
model.add(layers.Conv2D(32, (3, 3), activation='relu', input_shape=(224, 224, 3)))
model.add(layers.MaxPooling2D((2, 2)))
model.add(layers.Conv2D(64, (3, 3), activation='relu'))
model.add(layers.MaxPooling2D((2, 2)))
model.add(layers.Conv2D(64, (3, 3), activation='relu'))
model.add(layers.MaxPooling2D((2, 2)))
model.add(layers.Conv2D(64, (3, 3), activation='relu'))
model.add(layers.Flatten())
model.add(layers.Dense(64, activation='relu'))
model.add(layers.Dense(2))

# #@title Create ViT
# model = ViT(
#     image_size = 224,
#     patch_size = 32,
#     num_classes = 2,
#     dim = 1024,
#     depth = 6,
#     heads = 16,
#     mlp_dim = 2048,
#     dropout = 0.1,
#     emb_dropout = 0.1
# )

#@title Create data.txt and labels.txt
non_covid_training_file_name_path = 'COVID-CT/Data-split/NonCOVID/trainCT_NonCOVID.txt'
covid_training_file_name_path = 'COVID-CT/Data-split/COVID/trainCT_COVID.txt'
training_data_path = 'COVID-CT/Data-split/Training/data.txt'
training_label_path = 'COVID-CT/Data-split/Training/labels.txt'

non_covid_validation_file_name_path = 'COVID-CT/Data-split/NonCOVID/valCT_NonCOVID.txt'
covid_validation_file_name_path = 'COVID-CT/Data-split/COVID/valCT_COVID.txt'
validation_data_path = 'COVID-CT/Data-split/Validation/data.txt'
validation_label_path = 'COVID-CT/Data-split/Validation/labels.txt'

train_ds = create_file_list(non_covid_training_file_name_path, covid_training_file_name_path, training_data_path, training_label_path, from_drive=True)
validation_ds = create_file_list(non_covid_validation_file_name_path, covid_validation_file_name_path, validation_data_path, validation_label_path, from_drive=True)

#@title Create dataset from data.txt and labels.txt
training_info_folder = 'COVID-CT/Data-split/Training'
validation_info_folder = 'COVID-CT/Data-split/Validation'
train_ds = create_data_from_list(training_info_folder, from_drive=True)
validation_ds = create_data_from_list(validation_info_folder, from_drive=True)

train_model(model, n_epochs=50, train_ds=train_ds, validation_ds=validation_ds, learning_rate= 0.0001, batch_size=16, update_increment=10, save_figs=True)

model.save('savedModels/CNNCovidClassifier/tfModel')
tfjs.converters.save_keras_model(model, 'savedModels/CNNCovidClassifier/tfjsModel')