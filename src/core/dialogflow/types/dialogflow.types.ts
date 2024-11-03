// dialogflow.types.ts

export interface DialogflowRequest {
  responseId: string;
  queryResult: QueryResult;
  originalDetectIntentRequest: OriginalDetectIntentRequest;
  session: string;
}

export interface QueryResult {
  queryText: string;
  action: string;
  parameters: {
    [key: string]: any; // Parâmetros variáveis, como "id", "name", "doctor", etc.
  };
  allRequiredParamsPresent: boolean;
  fulfillmentText: string;
  fulfillmentMessages: FulfillmentMessage[];
  outputContexts: OutputContext[];
  intent: Intent;
  intentDetectionConfidence: number;
  languageCode: string;
}

export interface FulfillmentMessage {
  text: {
    text: string[];
  };
}

export interface OutputContext {
  name: string;
  parameters: {
    [key: string]: any;
  };
}

export interface Intent {
  name: string;
  displayName: string;
}

export interface OriginalDetectIntentRequest {
  source: string;
  payload: any;
}
