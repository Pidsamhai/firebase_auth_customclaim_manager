import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Auth } from "@angular/fire/auth";
import { from, Observable, switchMap } from "rxjs";
import { LoggerService } from "../logger/logger.service";

@Injectable({
    providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {
    constructor(
        private auth: Auth,
        private logger: LoggerService
    ) {

    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.logger.log("On Intercep");
        const user = this.auth.currentUser;
        if (!user) {
            throw new Error("Can't get user token");
        }
        return from(user.getIdToken())
            .pipe(
                switchMap((token) => {
                    req = req.clone({
                        setHeaders: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    return next.handle(req);
                })
            );
    }
}