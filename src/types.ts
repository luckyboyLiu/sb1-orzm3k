export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export interface Settings {
  apiEndpoint: string;
  apiKey: string;
  model: string;
}