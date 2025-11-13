import { CustomerType } from "@/graphql/generated/graphql"

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

  export const customerTypeDictionaryNames: Record<string, string> = {
    [CustomerType.ConsejosComunales]: "Consejos Comunales",
    [CustomerType.EmpresasPrivadas]: "Empresas Privadas",
    [CustomerType.PublicoGeneral]: "Público General",
  }