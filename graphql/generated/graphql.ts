/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** Date custom scalar type */
  DateTime: { input: any; output: any; }
  /** Decimal custom scalar type for monetary values */
  Decimal: { input: any; output: any; }
};

export type AuthPayload = {
  __typename?: 'AuthPayload';
  expiresIn: Scalars['String']['output'];
  token: Scalars['String']['output'];
  user: User;
};

export enum ClosingStatus {
  Completed = 'COMPLETED',
  Failed = 'FAILED',
  Pending = 'PENDING'
}

export type Company = {
  __typename?: 'Company';
  address: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  phone: Scalars['String']['output'];
  plants: Array<Plant>;
  rif: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  userPlants: Array<UserPlant>;
};

export type Container = {
  __typename?: 'Container';
  createdAt: Scalars['DateTime']['output'];
  currentInventoryL: Scalars['Float']['output'];
  gasEntries: Array<GasEntry>;
  id: Scalars['ID']['output'];
  invoices: Array<Invoice>;
  isActive: Scalars['Boolean']['output'];
  maxCapacityL: Scalars['Float']['output'];
  name: Scalars['String']['output'];
  plant: Plant;
  updatedAt: Scalars['DateTime']['output'];
};

export type Customer = {
  __typename?: 'Customer';
  address: Scalars['String']['output'];
  cedulaRif: Scalars['String']['output'];
  community: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  customerType: CustomerType;
  firstName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  lastName: Scalars['String']['output'];
  parish: Scalars['String']['output'];
  phone: Scalars['String']['output'];
  state: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export enum CustomerType {
  ConsejosComunales = 'CONSEJOS_COMUNALES',
  EmpresasPrivadas = 'EMPRESAS_PRIVADAS',
  PublicoGeneral = 'PUBLICO_GENERAL'
}

export type DailyClosing = {
  __typename?: 'DailyClosing';
  closingDate: Scalars['DateTime']['output'];
  createdAt: Scalars['DateTime']['output'];
  createdBy: User;
  id: Scalars['ID']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  plant: Plant;
  status: ClosingStatus;
  totalSales: Scalars['Float']['output'];
  totalVolumeL: Scalars['Float']['output'];
};

export type DailyClosingAnomaly = {
  __typename?: 'DailyClosingAnomaly';
  customerName: Scalars['String']['output'];
  cylinderCode: Scalars['String']['output'];
  daysSinceLastPurchase: Scalars['Int']['output'];
  lastPurchaseDate: Scalars['DateTime']['output'];
  restrictionPeriod: Scalars['Int']['output'];
};

export type DailyClosingDetail = {
  __typename?: 'DailyClosingDetail';
  anomalies: Array<DailyClosingAnomaly>;
  closing: DailyClosing;
  summary: Array<DailyClosingSummary>;
};

export type DailyClosingSummary = {
  __typename?: 'DailyClosingSummary';
  count: Scalars['Int']['output'];
  paymentMethod: PaymentMethod;
  totalAmount: Scalars['Float']['output'];
};

export type GasEntry = {
  __typename?: 'GasEntry';
  container: Container;
  createdAt: Scalars['DateTime']['output'];
  createdBy: User;
  id: Scalars['ID']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  plant: Plant;
  quantityL: Scalars['Float']['output'];
  supplier?: Maybe<Scalars['String']['output']>;
  vehiclePlate?: Maybe<Scalars['String']['output']>;
};

export type Invoice = {
  __typename?: 'Invoice';
  container: Container;
  createdAt: Scalars['DateTime']['output'];
  createdBy: User;
  id: Scalars['ID']['output'];
  items: Array<InvoiceItem>;
  notes?: Maybe<Scalars['String']['output']>;
  payments: Array<InvoicePayment>;
  plant: Plant;
  subtotal: Scalars['Float']['output'];
  tax: Scalars['Float']['output'];
  total: Scalars['Float']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type InvoiceItem = {
  __typename?: 'InvoiceItem';
  createdAt: Scalars['DateTime']['output'];
  cylinderCode?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  modalityAnomaly: Scalars['Boolean']['output'];
  product: Product;
  quantity: Scalars['Float']['output'];
  totalPrice: Scalars['Float']['output'];
  unitPrice: Scalars['Float']['output'];
};

export type InvoiceItemInput = {
  cylinderCode?: InputMaybe<Scalars['String']['input']>;
  productId: Scalars['ID']['input'];
  quantity: Scalars['Float']['input'];
  unitPrice: Scalars['Float']['input'];
};

export type InvoicePayment = {
  __typename?: 'InvoicePayment';
  amount: Scalars['Float']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  paymentMethod: PaymentMethod;
  reference?: Maybe<Scalars['String']['output']>;
};

export type InvoicePaymentInput = {
  amount: Scalars['Float']['input'];
  paymentMethod: PaymentMethod;
  reference?: InputMaybe<Scalars['String']['input']>;
};

export enum InvoiceStatus {
  Cancelled = 'CANCELLED',
  Paid = 'PAID',
  Pending = 'PENDING'
}

export type LoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  assignUserToPlant: UserPlant;
  cancelInvoice: Invoice;
  createCompany: Company;
  createContainer: Container;
  createCustomer: Customer;
  createInvoice: Invoice;
  createPlant: Plant;
  createProduct: Product;
  deleteContainer: Scalars['Boolean']['output'];
  deleteCustomer: Scalars['Boolean']['output'];
  deleteProduct: Scalars['Boolean']['output'];
  executeDailyClosing: DailyClosing;
  login: AuthPayload;
  logout: Scalars['Boolean']['output'];
  register: AuthPayload;
  registerCylinder: RegisteredCylinder;
  registerGasEntry: GasEntry;
  removeUserFromPlant: Scalars['Boolean']['output'];
  unregisterCylinder: Scalars['Boolean']['output'];
  updateCompany: Company;
  updateContainer: Container;
  updateCustomer: Customer;
  updateDailyClosingStatus: DailyClosing;
  updatePlant: Plant;
  updateProduct: Product;
  updateRegisteredCylinder: RegisteredCylinder;
};


export type MutationAssignUserToPlantArgs = {
  plantId: Scalars['ID']['input'];
  role: UserRole;
  userId: Scalars['ID']['input'];
};


export type MutationCancelInvoiceArgs = {
  id: Scalars['ID']['input'];
};


export type MutationCreateCompanyArgs = {
  address: Scalars['String']['input'];
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  phone: Scalars['String']['input'];
  rif: Scalars['String']['input'];
};


export type MutationCreateContainerArgs = {
  currentInventoryL: Scalars['Float']['input'];
  maxCapacityL: Scalars['Float']['input'];
  name: Scalars['String']['input'];
  plantId: Scalars['ID']['input'];
};


export type MutationCreateCustomerArgs = {
  address: Scalars['String']['input'];
  cedulaRif: Scalars['String']['input'];
  community: Scalars['String']['input'];
  customerType: CustomerType;
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  parish: Scalars['String']['input'];
  phone: Scalars['String']['input'];
  state: Scalars['String']['input'];
};


export type MutationCreateInvoiceArgs = {
  containerId: Scalars['ID']['input'];
  items: Array<InvoiceItemInput>;
  notes?: InputMaybe<Scalars['String']['input']>;
  payments: Array<InvoicePaymentInput>;
  plantId: Scalars['ID']['input'];
};


export type MutationCreatePlantArgs = {
  address: Scalars['String']['input'];
  code: Scalars['String']['input'];
  companyId: Scalars['ID']['input'];
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  phone: Scalars['String']['input'];
};


export type MutationCreateProductArgs = {
  baseCapacity: Scalars['Float']['input'];
  baseUnit: UnitType;
  customerType: CustomerType;
  name: Scalars['String']['input'];
  price: Scalars['Float']['input'];
  type: ProductType;
};


export type MutationDeleteContainerArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteCustomerArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteProductArgs = {
  id: Scalars['ID']['input'];
};


export type MutationExecuteDailyClosingArgs = {
  notes?: InputMaybe<Scalars['String']['input']>;
  plantId: Scalars['ID']['input'];
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationRegisterArgs = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationRegisterCylinderArgs = {
  customerId: Scalars['ID']['input'];
  productId: Scalars['ID']['input'];
  uniqueCode: Scalars['String']['input'];
};


export type MutationRegisterGasEntryArgs = {
  containerId: Scalars['ID']['input'];
  notes?: InputMaybe<Scalars['String']['input']>;
  plantId: Scalars['ID']['input'];
  quantityL: Scalars['Float']['input'];
  supplier?: InputMaybe<Scalars['String']['input']>;
  vehiclePlate?: InputMaybe<Scalars['String']['input']>;
};


export type MutationRemoveUserFromPlantArgs = {
  plantId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
};


export type MutationUnregisterCylinderArgs = {
  id: Scalars['ID']['input'];
};


export type MutationUpdateCompanyArgs = {
  address?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  rif?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateContainerArgs = {
  currentInventoryL?: InputMaybe<Scalars['Float']['input']>;
  id: Scalars['ID']['input'];
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  maxCapacityL?: InputMaybe<Scalars['Float']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateCustomerArgs = {
  address?: InputMaybe<Scalars['String']['input']>;
  cedulaRif?: InputMaybe<Scalars['String']['input']>;
  community?: InputMaybe<Scalars['String']['input']>;
  customerType?: InputMaybe<CustomerType>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  parish?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  state?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateDailyClosingStatusArgs = {
  id: Scalars['ID']['input'];
  status: ClosingStatus;
};


export type MutationUpdatePlantArgs = {
  address?: InputMaybe<Scalars['String']['input']>;
  code?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateProductArgs = {
  baseCapacity?: InputMaybe<Scalars['Float']['input']>;
  baseUnit?: InputMaybe<UnitType>;
  customerType?: InputMaybe<CustomerType>;
  id: Scalars['ID']['input'];
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['Float']['input']>;
  type?: InputMaybe<ProductType>;
};


export type MutationUpdateRegisteredCylinderArgs = {
  customerId?: InputMaybe<Scalars['ID']['input']>;
  id: Scalars['ID']['input'];
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  productId?: InputMaybe<Scalars['ID']['input']>;
  uniqueCode?: InputMaybe<Scalars['String']['input']>;
};

export enum PaymentMethod {
  DivisasFisicas = 'DIVISAS_FISICAS',
  Efectivo = 'EFECTIVO',
  PagoMovil = 'PAGO_MOVIL',
  PuntoVenta = 'PUNTO_VENTA',
  Transferencia = 'TRANSFERENCIA'
}

export type Plant = {
  __typename?: 'Plant';
  address: Scalars['String']['output'];
  code: Scalars['String']['output'];
  company: Company;
  containers: Array<Container>;
  createdAt: Scalars['DateTime']['output'];
  dailyClosings: Array<DailyClosing>;
  email: Scalars['String']['output'];
  gasEntries: Array<GasEntry>;
  id: Scalars['ID']['output'];
  invoices: Array<Invoice>;
  isActive: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  phone: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  userPlants: Array<UserPlant>;
};

export type Product = {
  __typename?: 'Product';
  baseCapacity: Scalars['Float']['output'];
  baseUnit: UnitType;
  createdAt: Scalars['DateTime']['output'];
  customerType: CustomerType;
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  price: Scalars['Float']['output'];
  type: ProductType;
  updatedAt: Scalars['DateTime']['output'];
};

export enum ProductType {
  Cilindro = 'CILINDRO',
  Granel = 'GRANEL'
}

export type Query = {
  __typename?: 'Query';
  companies: Array<Company>;
  company?: Maybe<Company>;
  container?: Maybe<Container>;
  containers: Array<Container>;
  containersByPlant: Array<Container>;
  customer?: Maybe<Customer>;
  customerByCedulaRif?: Maybe<Customer>;
  customers: Array<Customer>;
  customersByPlant: Array<Customer>;
  dailyClosing?: Maybe<DailyClosing>;
  dailyClosingByDate?: Maybe<DailyClosing>;
  dailyClosingDetail: DailyClosingDetail;
  dailyClosings: Array<DailyClosing>;
  dailyClosingsByPlant: Array<DailyClosing>;
  gasEntries: Array<GasEntry>;
  gasEntriesByContainer: Array<GasEntry>;
  gasEntriesByDateRange: Array<GasEntry>;
  gasEntriesByPlant: Array<GasEntry>;
  gasEntry?: Maybe<GasEntry>;
  invoice?: Maybe<Invoice>;
  invoices: Array<Invoice>;
  invoicesByContainer: Array<Invoice>;
  invoicesByDateRange: Array<Invoice>;
  invoicesByPlant: Array<Invoice>;
  me?: Maybe<User>;
  myPlants: Array<Plant>;
  plant?: Maybe<Plant>;
  plants: Array<Plant>;
  plantsByCompany: Array<Plant>;
  product?: Maybe<Product>;
  products: Array<Product>;
  productsByCustomerType: Array<Product>;
  productsByPlant: Array<Product>;
  productsByType: Array<Product>;
  registeredCylinder?: Maybe<RegisteredCylinder>;
  registeredCylinderByCode?: Maybe<RegisteredCylinder>;
  registeredCylinders: Array<RegisteredCylinder>;
  registeredCylindersByCustomer: Array<RegisteredCylinder>;
  registeredCylindersByPlant: Array<RegisteredCylinder>;
};


export type QueryCompanyArgs = {
  id: Scalars['ID']['input'];
};


export type QueryContainerArgs = {
  id: Scalars['ID']['input'];
};


export type QueryContainersByPlantArgs = {
  plantId: Scalars['ID']['input'];
};


export type QueryCustomerArgs = {
  id: Scalars['ID']['input'];
};


export type QueryCustomerByCedulaRifArgs = {
  cedulaRif: Scalars['String']['input'];
};


export type QueryCustomersByPlantArgs = {
  plantId: Scalars['ID']['input'];
};


export type QueryDailyClosingArgs = {
  id: Scalars['ID']['input'];
};


export type QueryDailyClosingByDateArgs = {
  date: Scalars['DateTime']['input'];
};


export type QueryDailyClosingDetailArgs = {
  id: Scalars['ID']['input'];
};


export type QueryDailyClosingsByPlantArgs = {
  plantId: Scalars['ID']['input'];
};


export type QueryGasEntriesByContainerArgs = {
  containerId: Scalars['ID']['input'];
};


export type QueryGasEntriesByDateRangeArgs = {
  endDate: Scalars['DateTime']['input'];
  startDate: Scalars['DateTime']['input'];
};


export type QueryGasEntriesByPlantArgs = {
  plantId: Scalars['ID']['input'];
};


export type QueryGasEntryArgs = {
  id: Scalars['ID']['input'];
};


export type QueryInvoiceArgs = {
  id: Scalars['ID']['input'];
};


export type QueryInvoicesByContainerArgs = {
  containerId: Scalars['ID']['input'];
};


export type QueryInvoicesByDateRangeArgs = {
  endDate: Scalars['DateTime']['input'];
  startDate: Scalars['DateTime']['input'];
};


export type QueryInvoicesByPlantArgs = {
  plantId: Scalars['ID']['input'];
};


export type QueryPlantArgs = {
  id: Scalars['ID']['input'];
};


export type QueryPlantsByCompanyArgs = {
  companyId: Scalars['ID']['input'];
};


export type QueryProductArgs = {
  id: Scalars['ID']['input'];
};


export type QueryProductsByCustomerTypeArgs = {
  customerType: CustomerType;
};


export type QueryProductsByPlantArgs = {
  plantId: Scalars['ID']['input'];
};


export type QueryProductsByTypeArgs = {
  type: ProductType;
};


export type QueryRegisteredCylinderArgs = {
  id: Scalars['ID']['input'];
};


export type QueryRegisteredCylinderByCodeArgs = {
  code: Scalars['String']['input'];
};


export type QueryRegisteredCylindersByCustomerArgs = {
  customerId: Scalars['ID']['input'];
};


export type QueryRegisteredCylindersByPlantArgs = {
  plantId: Scalars['ID']['input'];
};

export type RegisteredCylinder = {
  __typename?: 'RegisteredCylinder';
  createdAt: Scalars['DateTime']['output'];
  customer: Customer;
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  product: Product;
  uniqueCode: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export enum UnitType {
  Galon = 'GALON',
  Kg = 'KG'
}

export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  userPlants: Array<UserPlant>;
};

export type UserPlant = {
  __typename?: 'UserPlant';
  company: Company;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  plant: Plant;
  role: UserRole;
  updatedAt: Scalars['DateTime']['output'];
  user: User;
};

export enum UserRole {
  AdminPlanta = 'ADMIN_PLANTA',
  AdminPrincipal = 'ADMIN_PRINCIPAL',
  OperadorPlanta = 'OPERADOR_PLANTA',
  Visualizador = 'VISUALIZADOR'
}

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'AuthPayload', expiresIn: string, token: string, user: { __typename?: 'User', id: string, email: string, name: string, isActive: boolean, createdAt: any, updatedAt: any } } };

export type GetPlantsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPlantsQuery = { __typename?: 'Query', plants: Array<{ __typename?: 'Plant', id: string, code: string, name: string, address: string, phone: string, email: string, isActive: boolean, updatedAt: any, createdAt: any, company: { __typename?: 'Company', id: string, name: string } }> };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: string, email: string, name: string, isActive: boolean, createdAt: any, updatedAt: any } | null };


export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LoginInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"expiresIn"}},{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const GetPlantsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getPlants"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"plants"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"company"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<GetPlantsQuery, GetPlantsQueryVariables>;
export const MeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<MeQuery, MeQueryVariables>;