import { Inject, Injectable } from '@angular/core';

enum LogLevel {
  info,
  error,
  warn,
  log,
  table,
  all
}

const LOGGER_OPTIONS = "LOGGER_OPTIONS";

interface Options {
  level: Array<LogLevel>| LogLevel
  enable: boolean
}

@Injectable({
  providedIn: 'root'
})
class LoggerService {

  private get level(): Array<LogLevel> | LogLevel {
    return this.options.level;
  }

  private get enable(): boolean {
    return this.options.enable;
  }

  constructor(
    @Inject(LOGGER_OPTIONS) private options: Options,
  ) { }

  info(message: any): void {
    if(this.allowLog(LogLevel.log)) {
      console.log(message)
    }
  }

  error(message: any): void {
    if(this.allowLog(LogLevel.error)) {
      console.error(message)
    }
  }

  warn(message: any): void {
    if(this.allowLog(LogLevel.warn)) {
      console.warn(message)
    }
  }

  log(message: any): void {
    if(this.allowLog(LogLevel.log)) {
      console.log(message)
    }
  }

  table(message: any): void {
    if(this.allowLog(LogLevel.table)) {
      console.table(message)
    }
  }

  private allowLog(level: LogLevel): boolean {
    if(this.level instanceof Array) {
      return (this.level.includes(level) || this.level.includes(LogLevel.all)) && this.enable;
    }
    return (this.level == level || this.level == LogLevel.all) && this.options.enable;
  }
}

export { LoggerService, LOGGER_OPTIONS, Options, LogLevel }
