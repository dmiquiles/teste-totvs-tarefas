import { ErrorHandler, Injectable, Injector } from "@angular/core";

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  handleError(error: Error): void {
    // Handle the error here, e.g., log it to a remote server or show a notification
    console.error("An error occurred:", error.message);
  }
}