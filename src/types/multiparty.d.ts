declare module 'multiparty' {
    import { IncomingMessage } from 'http';
    import { EventEmitter } from 'events';
  
    export interface File {
      fieldName: string;
      originalFilename: string;
      path: string;
      headers: { [key: string]: string };
      size: number;
    }
  
    export interface Field {
      [key: string]: string[];
    }
  
    export interface Part {
      headers: { [key: string]: string };
      name: string;
      filename?: string;
      encoding: string;
      mime: string;
    }
  
    export interface Options {
      maxFields?: number;
      maxFieldsSize?: number;
      uploadDir?: string;
      keepExtensions?: boolean;
      encoding?: string;
      hash?: string | boolean;
      multiples?: boolean;
    }
  
    export class Form extends EventEmitter {
      constructor(options?: Options);
      parse(
        req: IncomingMessage,
        callback?: (err: Error, fields: Field, files: { [key: string]: File[] }) => void
      ): void;
    }
  }
  