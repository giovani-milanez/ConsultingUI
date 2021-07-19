import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react'
import {   
  Platform,
  View,
  Text,
  ScrollView,
  TouchableOpacity
} from 'react-native'
import { 
  Card, 
  Rating, 
  Avatar,
  SearchBar 
} from 'react-native-elements'

import { CustomHeader } from '../../components/CustomHeader'
import { theme } from '../../global/theme';
import { ConsultantScreenNavigationProp } from '../../navigation';
import api from '../../plugins/axios';

interface User {
  id: number,
  name: string,
  rateCount: number,
  rateMeanStars: number,
  profilePicUrl: string
}

interface Service {
  id: number,
  title: string,
  description: string,
  pictureUrl: string,
  user: User
}

interface ServiceCardProps {
  service: Service
}

export function ServiceCard(props: ServiceCardProps) {
  const navigation = useNavigation<ConsultantScreenNavigationProp>();
  return (
    <Card>
      <Card.Title>
        <TouchableOpacity onPress={() => navigation.navigate('Consultant', { id: props.service.user.id })}>
          <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
            <View style={{alignSelf: 'center'}}>
              <Avatar 
                source={props.service.user.profilePicUrl ? {uri: props.service.user.profilePicUrl} : require('../../assets/empty_avatar.jpg')}
                rounded
                size='medium'
              />
            </View>
            <View style={{flexDirection: 'column', alignItems: 'flex-start', paddingLeft: 10}}>
              {props.service.user.rateCount > 0 && <Rating readonly imageSize={20} startingValue={props.service.user.rateMeanStars} />}
              <Text>{props.service.user.name}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </Card.Title>
      <Card.Divider/>
      <Card.Image resizeMode='stretch' source={ props.service.pictureUrl ? { uri: props.service.pictureUrl } : require('../../assets/empty_product.jpg')}>        
      </Card.Image>
      <Text style={{marginTop: 10, marginLeft: 10, fontSize: 18, fontWeight: 'bold', color: theme.colors.secondary}}>
        {props.service.title}
      </Text>
    </Card>
  )
}

export function FindServices() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sort, setSort] = useState('asc');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [services, setServices] = useState<Service[]>([]);

  const findServices = () => {
    setLoading(true)
    api.get(`/public/find-services/${sort}/${pageSize}/${page}?name=${search}`)
    .then((res) => {
      setServices(res.data.list)
    })
    .finally(() => {
      setLoading(false)
    })
  }
 
  useEffect(() => {
    findServices()
  }, [search]);


  return (
    <View>
      <CustomHeader title="Serviços" />
      <ScrollView>
        <View style={{width: '100%', alignSelf: 'center', paddingHorizontal: Platform.OS === 'web' ? 100 : 20}}>
        <SearchBar
          placeholder="Nome do serviço ou consultora"
          // @ts-ignore
          onChangeText={setSearch}
          lightTheme
          value={search}
        />
        </View>
        <View style={{ flexWrap: 'wrap', flexDirection: Platform.OS === 'web' ? 'row' : 'column', paddingHorizontal: Platform.OS === 'web' ? 100 : 20}}>
          {services.map(service =>
              <View key={service.id} style={{width: Platform.OS === 'web' ? '25%' : '100%'}}>
                <ServiceCard  service={service} />
              </View>
            ) }
      </View>
      </ScrollView>
    </View>
  )
}