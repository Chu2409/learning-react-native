export class Formatter {
  public static currency(value: number): string {
    return new Intl.NumberFormat("es-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  }
}