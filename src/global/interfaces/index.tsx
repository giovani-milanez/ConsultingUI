// interfaces

import { MyServicesScreenNavigationProp } from "../../navigation";

export interface User {
  id: number,
  name: string,
  rateCount: number,
  rateMeanStars: number,
  profilePicUrl: string,
  shortDescription: string
}

export interface Service {
  id: number,
  title: string,
  description: string,
  pictureUrl: string,
  user?: User
}

// props
export interface MyServicesProps {
  navigation: MyServicesScreenNavigationProp,
  services: Service[]
}

export interface ServiceCardProps {
  service: Service
}

export interface ServiceFormProps {
  service: Service | undefined
}