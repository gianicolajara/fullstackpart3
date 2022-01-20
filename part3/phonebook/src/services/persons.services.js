import axios from 'axios'

const urlPersons = '/api/persons'

const getAllPerson = () => {
  const request = axios.get(urlPersons)
  return request.then((res) => res.data)
}

const createPerson = (newPerson) => {
  const request = axios.post(urlPersons, newPerson)
  return request.then((res) => res.data)
}

const updatePerson = (id, personToUpdate) => {
  const request = axios.put(`${urlPersons}/${id}`, personToUpdate)
  return request.then((res) => res.data)
}

const deletePerson = (id) => {
  const request = axios.delete(`${urlPersons}/${id}`)
  return request.then((res) => res.data)
}

const getPersonByName = (name) => {
  const request = axios.get(`${urlPersons}?name=${name}`)
  return request.then((res) => res.data)
}

/* const getPersonByNumber = (number) => {
  const request = axios.get(`${urlPersons}?number=${number}`)
  return request.then((res) => res.data)
}
 */
export default {
  getAllPerson,
  createPerson,
  updatePerson,
  deletePerson,
  getPersonByName,
}
