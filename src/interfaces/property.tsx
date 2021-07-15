export interface IProperty {
  id: string,
  name: string,
  pictureUrl: string,
  addressLine1: string,
  postalCode: string, 
  city: string,
}

export interface IPropertyFile {
  title: string,
  status: string,
  lastActivity: string,
  lastActivityDate: string,
  [key: string]: any,
}

export interface IPropertyInfos {
  outsideDoorCode: string,
  keeperWorkHours: string,
}

export interface IFilter {
  field: string, 
  fieldValue: string,
}