import React, { useEffect, useState } from 'react'
import {   
  Platform,
  View,
  ScrollView
} from 'react-native'
import { 
  SearchBar 
} from 'react-native-elements'

import { CustomHeader } from '../../components/CustomHeader'
import { Service, ServiceCard } from '../../components/ServiceCard';
import api from '../../plugins/axios';



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