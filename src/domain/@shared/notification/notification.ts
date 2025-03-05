export type NotificationErrorProps = {
  message: string;
  context: string;
};

export default class Notification {
  private errors: NotificationErrorProps[] = [];

  addError(error: NotificationErrorProps) {
    this.errors.push(error);
  }

  getErrors(): NotificationErrorProps[] {
    return this.errors;
  }

  hasErrors(): boolean {
    return this.errors.length > 0;
  }

  messages(context?: string): string {
    if (!context) {
      return this.errors
        .map((error) => `${error.context}: ${error.message},`)
        .join("");
    }

    return this.errors
      .filter((error) => error.context === context)
      .map((error) => `${error.context}: ${error.message},`)
      .join("");
  }
}
