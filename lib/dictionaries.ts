import { CustomerType, ClosingStatus } from "@/graphql/generated/graphql"

export const plantDictionaryNames: Record<string, string> = {
    code: "Código",
    name: "Nombre",
    address: "Dirección",
    phone: "Teléfono",
    email: "Correo"
  }

  export const userDictionaryNames: Record<string, string> = {
    name: "Nombre",
    email: "Correo",
    role: "Rol",
    status: "Estado",
    userPlants: "Plantas",
    "size-plants": "Cantidad"
  }

  export const productDictionaryNames: Record<string, string> = {
    name: "Nombre",
    type: "Tipo",
    baseCapacity: "Capacidad",
    baseUnit: "Unidad",
    price: "Precio",
    customerType: "Tipo de Cliente",
  }

  export const dailyClosingDictionaryNames: Record<string, string> = {
    id: "N°",
    closingDate: "Fecha de cierre",
    totalSales: "Total de ventas",
    totalVolumeL: "Total de volumen",
    createdBy: "Cerrado por",
    plant: "Planta",
    status: "Estado",
    notes: "Notas",
  }

  export const customerTypeDictionaryNames: Record<string, string> = {
    [CustomerType.ConsejosComunales]: "Consejos Comunales",
    [CustomerType.EmpresasPrivadas]: "Empresas Privadas",
    [CustomerType.PublicoGeneral]: "Público General",
  }

  export const dailyClosingStatusDictionaryNames: Record<string, string> = {
    [ClosingStatus.Pending]: "Pendiente",
    [ClosingStatus.Completed]: "Completado",
    [ClosingStatus.Failed]: "Fallido",
  }