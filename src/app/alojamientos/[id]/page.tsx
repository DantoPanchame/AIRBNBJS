interface Props { params: { id: string } }
export default function AlojamientoDetallePage({ params }: Props) {
  return <div>Detalle alojamiento {params.id}</div>;
}
