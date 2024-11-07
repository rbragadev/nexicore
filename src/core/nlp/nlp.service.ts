import { Injectable } from '@nestjs/common';
import * as natural from 'natural';
import { intentConfig } from '../../config/intent.config';

@Injectable()
export class NlpService {
  private classifier: natural.BayesClassifier;

  constructor() {
    this.classifier = new natural.BayesClassifier();
    this.trainIntents();
  }

  private trainIntents() {
    for (const intent in intentConfig) {
      const phrases = intentConfig[intent];
      phrases.forEach((phrase) => {
        this.classifier.addDocument(phrase, intent);
      });
    }

    this.classifier.train();
  }

  classifyIntent(text: string): string {
    return this.classifier.classify(text);
  }
}
