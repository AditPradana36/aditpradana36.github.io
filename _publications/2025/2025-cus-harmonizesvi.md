---
title:          "Harmonizing street-view semantics and spatial predictors for dominant urban visual composition modelling"
date:           2025-09-13
selected:       true
pub:            "Computational Urban Science"
pub_last:       ' <span class="badge badge-pill badge-publication badge-success">Spotlight</span>'
pub_date:       "2025"
semantic_scholar_id: 81590bfd395c334b71d4c2c0df689b57cc533be5  # use this to retrieve citation count
abstract: >-
  Street-level visual experiences are underrepresented in top-down spatial datasets such as remote sensing and spatial footprints, which predominantly capture configurations from an overhead perspective. This study develops a framework to model and map urban visual dominance, defined through seven typologies based on Greenness, Openness, and Enclosure. A total of 12,631 Google Street View panoramas were semantically segmented with a pretrained ADE20K deep learning model to extract proportions of trees, buildings, and sky. These proportions were aggregated into 50 m hexagonal grids and classified into visual dominance classes through rule-based logic. To predict these classes beyond street-view coverage, three scenarios of spatial predictors (remote sensing indices, building footprints, and their combination) were evaluated using five machine learning algorithms. Logistic Regression with combined predictors performed best, achieving an accuracy of 0.503 and an AUC-ROC up to 0.85 for the Greenness class. External validation against GHSL settlement data across six urban sites showed soft accuracy scores ranging from 22.33% to 67.23%, with better performance in structured environments than in fragmented residential settings. These findings highlight both the promise and limitations of generalizing street-view visual information from two-dimensional spatial features, offering a scalable approach to bridge the spatial coverage gap and support more human-centered urban landscape analysis.

cover:          /assets/images/covers/2025-cus-harmonizesvi.png
authors:
  - Mohammad Raditia Pradana#
  - Muhammad Dimyati
  - Ahmad Gamal

links:
  Paper: https://doi.org/10.1007/s43762-025-00210-z
  # Code: https://github.com

---