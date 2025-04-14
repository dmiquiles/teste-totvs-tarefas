import { Injectable, Injector, NgZone } from "@angular/core";
import { Router } from "@angular/router";

@Injectable()
export class AppErrorHandler {
  constructor(private injector: Injector) {}
  handleError(error: Error): void {
    // Handle the error here, e.g., log it to a remote server or show a notification
    console.error("An error occurred:", error.message);

    const router = this.injector.get(Router);
    const ngZone = this.injector.get(NgZone);

    ngZone.runGuarded(() => {
      router.navigate(["/error"]);
    });

  }
}