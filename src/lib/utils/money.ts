export function calcTotal(base: number, impuestos: number = 0, descuentos: number = 0) {
  return base + impuestos - descuentos;
}
