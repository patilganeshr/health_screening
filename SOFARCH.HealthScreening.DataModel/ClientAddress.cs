using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using System.Data.Common;

using Microsoft.Practices.EnterpriseLibrary.Common;
using Microsoft.Practices.EnterpriseLibrary.Data;
using DRE = DataRecordExtensions.DataRecordExtensions;

namespace SOFARCH.HealthScreening.DataModel
{
    public class ClientAddress
    {
        private readonly Database database;

        public ClientAddress()
        {
            database = DBConnect.getDBConnection();
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="clientAddress"></param>
        /// <returns></returns>
        private Int32 AddClientAddress(Entities.ClientAddress clientAddress)
        {
            var clientAddressId = 0;

            DbCommand dbCommand = null;

            try
            {
                using (dbCommand = database.GetStoredProcCommand(DBStoredProcedure.InsertClientAddress))
                {
                    database.AddInParameter(dbCommand, "@client_id", DbType.Int32, clientAddress.ClientId == null || clientAddress.ClientId == 0 ? (object)DBNull.Value : clientAddress.ClientId);
                    database.AddInParameter(dbCommand, "@address_type_id", DbType.Int32, clientAddress.AddressTypeId == null || clientAddress.AddressTypeId == 0 ? (object)DBNull.Value : clientAddress.AddressTypeId);
                    database.AddInParameter(dbCommand, "@client_address_id", DbType.Int32, clientAddress.ClientAddressId == null || clientAddress.ClientAddressId == 0 ? (object)DBNull.Value : clientAddress.ClientAddressId);
                    database.AddInParameter(dbCommand, "@client_address_name", DbType.String, string.IsNullOrEmpty(clientAddress.ClientAddressName) ? (object)DBNull.Value : clientAddress.ClientAddressName);
                    database.AddInParameter(dbCommand, "@address", DbType.String, string.IsNullOrEmpty(clientAddress.Address) ? (object)DBNull.Value : clientAddress.Address);
                    database.AddInParameter(dbCommand, "@country_id", DbType.Int32, clientAddress.CountryId == null || clientAddress.CountryId == 0 ? (object)DBNull.Value : clientAddress.CountryId);
                    database.AddInParameter(dbCommand, "@state_id", DbType.Int32, clientAddress.StateId == null || clientAddress.StateId == 0 ? (object)DBNull.Value : clientAddress.StateId);
                    database.AddInParameter(dbCommand, "@city_id", DbType.Int32, clientAddress.CityId == null || clientAddress.CityId == 0 ? (object)DBNull.Value : clientAddress.CityId);
                    database.AddInParameter(dbCommand, "@area", DbType.String, string.IsNullOrEmpty(clientAddress.Area) ? (object)DBNull.Value : clientAddress.Area);
                    database.AddInParameter(dbCommand, "@pin_code", DbType.String, string.IsNullOrEmpty(clientAddress.PinCode) ? (object)DBNull.Value : clientAddress.PinCode);
                    database.AddInParameter(dbCommand, "@tel_no", DbType.String, string.IsNullOrEmpty(clientAddress.TelNo) ? (object)DBNull.Value : clientAddress.TelNo);
                    database.AddInParameter(dbCommand, "@fax_no", DbType.String, string.IsNullOrEmpty(clientAddress.FaxNo) ? (object)DBNull.Value : clientAddress.FaxNo);
                    database.AddInParameter(dbCommand, "@email_id", DbType.String, string.IsNullOrEmpty(clientAddress.EmailId) ? (object)DBNull.Value : clientAddress.EmailId);
                    database.AddInParameter(dbCommand, "@contact_nos", DbType.String, string.IsNullOrEmpty(clientAddress.ContactNos) ? (object)DBNull.Value : clientAddress.ContactNos);
                    database.AddInParameter(dbCommand, "@service_tax_no", DbType.String, string.IsNullOrEmpty(clientAddress.ServiceTaxNo) ? (object)DBNull.Value : clientAddress.ServiceTaxNo);
                    database.AddInParameter(dbCommand, "@vat_no", DbType.String, string.IsNullOrEmpty(clientAddress.VATNo) ? (object)DBNull.Value : clientAddress.VATNo);
                    database.AddInParameter(dbCommand, "@tin_no", DbType.String, string.IsNullOrEmpty(clientAddress.TINNo) ? (object)DBNull.Value : clientAddress.TINNo);
                    database.AddInParameter(dbCommand, "@pan_no", DbType.String, string.IsNullOrEmpty(clientAddress.PANNo) ? (object)DBNull.Value : clientAddress.PANNo);
                    database.AddInParameter(dbCommand, "@gst_no", DbType.String, string.IsNullOrEmpty(clientAddress.GSTNo) ? (object)DBNull.Value : clientAddress.GSTNo);
                    database.AddInParameter(dbCommand, "@created_by", DbType.Int32, clientAddress.CreatedBy);
                    database.AddInParameter(dbCommand, "@created_by_ip", DbType.String, clientAddress.CreatedByIP);

                    database.AddOutParameter(dbCommand, "@return_value", DbType.Int32, 0);

                    clientAddressId = database.ExecuteNonQuery(dbCommand);

                    if (database.GetParameterValue(dbCommand, "@return_value") != DBNull.Value)
                    {
                        clientAddressId = Convert.ToInt32(database.GetParameterValue(dbCommand, "@return_value"));
                    }
                }
            }
            catch (Exception e)
            {
                throw e;
            }
            finally
            {
                dbCommand = null;
            }

            return clientAddressId;
        }

        private Int32 AddClientAddress(Entities.ClientAddress clientAddress, DbTransaction transaction)
        {
            var clientAddressId = 0;

            DbCommand dbCommand = null;

            try
            {
                using (dbCommand = database.GetStoredProcCommand(DBStoredProcedure.InsertClientAddress))
                {
                    database.AddInParameter(dbCommand, "@client_id", DbType.Int32, clientAddress.ClientId == null || clientAddress.ClientId == 0 ? (object)DBNull.Value : clientAddress.ClientId);
                    database.AddInParameter(dbCommand, "@address_type_id", DbType.Int32, clientAddress.AddressTypeId == null || clientAddress.AddressTypeId == 0 ? (object)DBNull.Value : clientAddress.AddressTypeId);
                    database.AddInParameter(dbCommand, "@client_address_id", DbType.Int32, clientAddress.ClientAddressId == null || clientAddress.ClientAddressId == 0 ? (object)DBNull.Value : clientAddress.ClientAddressId);
                    database.AddInParameter(dbCommand, "@client_address_name", DbType.String, string.IsNullOrEmpty(clientAddress.ClientAddressName) ? (object)DBNull.Value : clientAddress.ClientAddressName);
                    database.AddInParameter(dbCommand, "@address", DbType.String, string.IsNullOrEmpty(clientAddress.Address) ? (object)DBNull.Value : clientAddress.Address);
                    database.AddInParameter(dbCommand, "@country_id", DbType.Int32, clientAddress.CountryId == null || clientAddress.CountryId == 0 ? (object)DBNull.Value : clientAddress.CountryId);
                    database.AddInParameter(dbCommand, "@state_id", DbType.Int32, clientAddress.StateId == null || clientAddress.StateId == 0 ? (object)DBNull.Value : clientAddress.StateId);
                    database.AddInParameter(dbCommand, "@city_id", DbType.Int32, clientAddress.CityId == null || clientAddress.CityId == 0 ? (object)DBNull.Value : clientAddress.CityId);
                    database.AddInParameter(dbCommand, "@area", DbType.String, string.IsNullOrEmpty(clientAddress.Area) ? (object)DBNull.Value : clientAddress.Area);
                    database.AddInParameter(dbCommand, "@pin_code", DbType.String, string.IsNullOrEmpty(clientAddress.PinCode) ? (object)DBNull.Value : clientAddress.PinCode);
                    database.AddInParameter(dbCommand, "@tel_no", DbType.String, string.IsNullOrEmpty(clientAddress.TelNo) ? (object)DBNull.Value : clientAddress.TelNo);
                    database.AddInParameter(dbCommand, "@fax_no", DbType.String, string.IsNullOrEmpty(clientAddress.FaxNo) ? (object)DBNull.Value : clientAddress.FaxNo);
                    database.AddInParameter(dbCommand, "@email_id", DbType.String, string.IsNullOrEmpty(clientAddress.EmailId) ? (object)DBNull.Value : clientAddress.EmailId);
                    database.AddInParameter(dbCommand, "@contact_nos", DbType.String, string.IsNullOrEmpty(clientAddress.ContactNos) ? (object)DBNull.Value : clientAddress.ContactNos);
                    database.AddInParameter(dbCommand, "@service_tax_no", DbType.String, string.IsNullOrEmpty(clientAddress.ServiceTaxNo) ? (object)DBNull.Value : clientAddress.ServiceTaxNo);
                    database.AddInParameter(dbCommand, "@vat_no", DbType.String, string.IsNullOrEmpty(clientAddress.VATNo) ? (object)DBNull.Value : clientAddress.VATNo);
                    database.AddInParameter(dbCommand, "@tin_no", DbType.String, string.IsNullOrEmpty(clientAddress.TINNo) ? (object)DBNull.Value : clientAddress.TINNo);
                    database.AddInParameter(dbCommand, "@pan_no", DbType.String, string.IsNullOrEmpty(clientAddress.PANNo) ? (object)DBNull.Value : clientAddress.PANNo);
                    database.AddInParameter(dbCommand, "@gst_no", DbType.String, string.IsNullOrEmpty(clientAddress.GSTNo) ? (object)DBNull.Value : clientAddress.GSTNo);
                    database.AddInParameter(dbCommand, "@created_by", DbType.Int32, clientAddress.CreatedBy);
                    database.AddInParameter(dbCommand, "@created_by_ip", DbType.String, clientAddress.CreatedByIP);

                    database.AddOutParameter(dbCommand, "@return_value", DbType.Int32, 0);

                    clientAddressId = database.ExecuteNonQuery(dbCommand, transaction);

                    if (database.GetParameterValue(dbCommand, "@return_value") != DBNull.Value)
                    {
                        clientAddressId = Convert.ToInt32(database.GetParameterValue(dbCommand, "@return_value"));
                    }
                }
            }
            catch (Exception e)
            {
                throw e;
            }
            finally
            {
                dbCommand = null;
            }

            return clientAddressId;
        }

        public bool IsClientAddresseeNameExists(Int32 clientId, string clientAddresseeName)
        {
            var isClientAddresseeNameExists = false;

            DbCommand dbCommand = null;

            try
            {
                using (dbCommand = database.GetStoredProcCommand(DBStoredProcedure.CheckClientAddressNameIsExists))
                {
                    database.AddInParameter(dbCommand, "@client_id", DbType.Int32, clientId);
                    database.AddInParameter(dbCommand, "@client_address_name", DbType.String, clientAddresseeName);

                    using (IDataReader reader = database.ExecuteReader(dbCommand))
                    {
                        while (reader.Read())
                        {
                            isClientAddresseeNameExists = DRE.GetBoolean(reader, "is_client_address_name_exists");
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                dbCommand = null;
            }

            return isClientAddresseeNameExists;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="clientAddress"></param>
        /// <returns></returns>
        public bool DeleteClientAddress(Entities.ClientAddress clientAddress)
        {
            bool isDeleted = false;

            DbCommand dbCommand = null;

            try
            {
                using (dbCommand = database.GetStoredProcCommand(DBStoredProcedure.DeleteClientAddress))
                {
                    database.AddInParameter(dbCommand, "@client_address_id", DbType.Int32, clientAddress.ClientAddressId);
                    database.AddInParameter(dbCommand, "@deleted_by", DbType.Int32, clientAddress.DeletedBy);
                    database.AddInParameter(dbCommand, "@deleted_by_ip", DbType.String, clientAddress.DeletedByIP);

                    database.AddOutParameter(dbCommand, "@return_value", DbType.Int32, 0);

                    var result = database.ExecuteNonQuery(dbCommand);

                    if (database.GetParameterValue(dbCommand, "@return_value") != DBNull.Value)
                    {
                        isDeleted = Convert.ToBoolean(database.GetParameterValue(dbCommand, "@return_value"));
                    }
                }
            }
            catch (Exception e)
            {
                throw e;
            }
            finally
            {
                dbCommand = null;
            }

            return isDeleted;
        }

        public bool DeleteClientAddress(Entities.ClientAddress clientAddress, DbTransaction transaction)
        {
            bool isDeleted = false;

            DbCommand dbCommand = null;

            try
            {
                using (dbCommand = database.GetStoredProcCommand(DBStoredProcedure.DeleteClientAddress))
                {
                    database.AddInParameter(dbCommand, "@client_address_id", DbType.Int32, clientAddress.ClientAddressId);
                    database.AddInParameter(dbCommand, "@deleted_by", DbType.Int32, clientAddress.DeletedBy);
                    database.AddInParameter(dbCommand, "@deleted_by_ip", DbType.String, clientAddress.DeletedByIP);

                    database.AddOutParameter(dbCommand, "@return_value", DbType.Int32, 0);

                    var result = database.ExecuteNonQuery(dbCommand, transaction);

                    if (database.GetParameterValue(dbCommand, "@return_value") != DBNull.Value)
                    {
                        isDeleted = Convert.ToBoolean(database.GetParameterValue(dbCommand, "@return_value"));
                    }
                }
            }
            catch (Exception e)
            {
                throw e;
            }
            finally
            {
                dbCommand = null;
            }

            return isDeleted;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public List<Entities.ClientAddress> GetAllClientAddressess()
        {
            var clientAddresses = new List<Entities.ClientAddress>();

            DbCommand dbCommand = null;

            try
            {
                using (dbCommand = database.GetStoredProcCommand(DBStoredProcedure.GetAllClientAddressess))
                {
                    using (IDataReader reader = database.ExecuteReader(dbCommand))
                    {
                        while (reader.Read())
                        {
                            var clientAddress = new Entities.ClientAddress
                            {
                                ClientId = DRE.GetNullableInt32(reader, "client_id", 0),
                                ClientName = DRE.GetNullableString(reader, "client_name", null),
                                ClientTypeId = DRE.GetNullableInt32(reader, "client_type_id", null),
                                ClientType = DRE.GetNullableString(reader, "client_type", null),
                                AddressTypeId = DRE.GetNullableInt32(reader, "address_type_id", 0),
                                AddressType = DRE.GetNullableString(reader, "address_type", null),
                                ClientAddressCode = DRE.GetNullableString(reader, "client_address_code", null),
                                ClientAddressId = DRE.GetNullableInt32(reader, "client_address_id", 0),
                                ClientAddressName = DRE.GetNullableString(reader, "client_address_name", null),
                                Address = DRE.GetNullableString(reader, "address", null),
                                CountryId = DRE.GetNullableInt32(reader, "country_id", null),
                                CountryName = DRE.GetNullableString(reader, "country_name", null),
                                StateId = DRE.GetNullableInt32(reader, "state_id", 0),
                                StateName = DRE.GetNullableString(reader, "state_name", null),
                                CityId = DRE.GetNullableInt32(reader, "city_id", 0),
                                CityName = DRE.GetNullableString(reader, "city_name", null),
                                Area = DRE.GetNullableString(reader, "area", null),
                                EmailId = DRE.GetNullableString(reader, "email_id", null),
                                ContactNos = DRE.GetNullableString(reader, "contact_nos", null),
                                GSTNo = DRE.GetNullableString(reader, "gst_no", null),
                                SrNo = DRE.GetNullableInt64(reader, "sr_no", null)
                            };

                            clientAddresses.Add(clientAddress);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                dbCommand = null;
            }

            return clientAddresses;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="clientTypeId"></param>
        /// <returns></returns>
        public List<Entities.ClientAddress> GetClientAddressNamesByClientTypeId(Int32 clientTypeId)
        {
            var clientAddresses = new List<Entities.ClientAddress>();

            DbCommand dbCommand = null;

            try
            {
                using (dbCommand = database.GetStoredProcCommand(DBStoredProcedure.GetClientAddressNamesByClientTypeId))
                {
                    database.AddInParameter(dbCommand, "@client_type_id", DbType.Int32, clientTypeId);

                    using (IDataReader reader = database.ExecuteReader(dbCommand))
                    {
                        while (reader.Read())
                        {
                            var clientAddress = new Entities.ClientAddress
                            {
                                ClientAddressId = DRE.GetNullableInt32(reader, "client_address_id", 0),
                                ClientAddressName = DRE.GetNullableString(reader, "client_address_name", null)
                            };

                            clientAddresses.Add(clientAddress);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                dbCommand = null;
            }

            return clientAddresses;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="clientAddressName"></param>
        /// <returns></returns>
        public List<Entities.ClientAddress> SearchClientAddressNameByClientAddressName(string clientAddressName)
        {
            var clientAddresses = new List<Entities.ClientAddress>();

            DbCommand dbCommand = null;

            try
            {
                using (dbCommand = database.GetStoredProcCommand(DBStoredProcedure.SearchClientAddressNameByClientAddressName))
                {
                    database.AddInParameter(dbCommand, "@client_address_name", DbType.String, clientAddressName);

                    using (IDataReader reader = database.ExecuteReader(dbCommand))
                    {
                        while (reader.Read())
                        {
                            var clientAddress = new Entities.ClientAddress
                            {
                                ClientAddressId = DRE.GetNullableInt32(reader, "client_address_id", 0),
                                ClientAddressName = DRE.GetNullableString(reader, "client_address_name", null)
                            };

                            clientAddresses.Add(clientAddress);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                dbCommand = null;
            }

            return clientAddresses;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public List<Entities.ClientAddress> GetAllClientAddressessByClientId(Int32 clientId)
        {
            var clientAddresses = new List<Entities.ClientAddress>();

            DbCommand dbCommand = null;

            try
            {
                using (dbCommand = database.GetStoredProcCommand(DBStoredProcedure.GetAllClientAddressByClientId))
                {
                    database.AddInParameter(dbCommand, "@client_id", DbType.Int32, clientId);

                    using (IDataReader reader = database.ExecuteReader(dbCommand))
                    {
                        while (reader.Read())
                        {
                            //var customerAndTransporterMapping = new CustomerAndTransporterMapping();

                            var clientAddress = new Entities.ClientAddress
                            {
                                ClientId = DRE.GetNullableInt32(reader, "client_id", 0),
                                ClientName = DRE.GetNullableString(reader, "client_name", null),
                                ClientTypeId = DRE.GetNullableInt32(reader, "client_type_id", null),
                                ClientType = DRE.GetNullableString(reader, "client_type", null),
                                AddressTypeId = DRE.GetNullableInt32(reader, "address_type_id", 0),
                                AddressType = DRE.GetNullableString(reader, "address_type", null),
                                ClientAddressCode = DRE.GetNullableString(reader, "client_address_code", null),
                                ClientAddressId = DRE.GetNullableInt32(reader, "client_address_id", 0),
                                ClientAddressName = DRE.GetNullableString(reader, "client_address_name", null),
                                Address = DRE.GetNullableString(reader, "address", null),
                                CountryId = DRE.GetNullableInt32(reader, "country_id", null),
                                CountryName = DRE.GetNullableString(reader, "country_name", null),
                                StateId = DRE.GetNullableInt32(reader, "state_id", 0),
                                StateName = DRE.GetNullableString(reader, "state_name", null),
                                CityId = DRE.GetNullableInt32(reader, "city_id", 0),
                                CityName = DRE.GetNullableString(reader, "city_name", null),
                                Area = DRE.GetNullableString(reader, "area", null),
                                EmailId = DRE.GetNullableString(reader, "email_id", null),
                                ContactNos = DRE.GetNullableString(reader, "contact_nos", null),
                                GSTNo = DRE.GetNullableString(reader, "gst_no", null),
                                SrNo = DRE.GetNullableInt64(reader, "sr_no", null)
                                //CustomerAndTransporterMapping = customerAndTransporterMapping.GetTransportersListByCustomerAddressId(DRE.GetInt32(reader, "client_address_id"))
                            };

                            clientAddresses.Add(clientAddress);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                dbCommand = null;
            }

            return clientAddresses;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="clientAddressId"></param>
        /// <returns></returns>
        public Entities.ClientAddress GetClientAddressById(Int32 clientAddressId)
        {
            var clientAddress = new Entities.ClientAddress();

            DbCommand dbCommand = null;

            using (dbCommand = database.GetStoredProcCommand(DBStoredProcedure.GetClientAddressById))
            {
                database.AddInParameter(dbCommand, "@client_address_id", DbType.Int32, clientAddressId);

                using (IDataReader reader = database.ExecuteReader(dbCommand))
                {
                    while (reader.Read())
                    {
                        var _clientAddress = new Entities.ClientAddress
                        {
                            ClientTypeId = DRE.GetNullableInt32(reader, "client_type_id", null),
                            ClientType = DRE.GetNullableString(reader, "client_type", null),
                            ClientId = DRE.GetNullableInt32(reader, "client_id", 0),
                            ClientName = DRE.GetNullableString(reader, "client_name", null),
                            ClientAddressCode = DRE.GetNullableString(reader, "client_address_code", null),
                            AddressTypeId = DRE.GetNullableInt32(reader, "address_type_id", 0),
                            AddressType = DRE.GetNullableString(reader, "address_type", null),
                            ClientAddressId = DRE.GetNullableInt32(reader, "client_address_id", 0),
                            ClientAddressName = DRE.GetNullableString(reader, "client_address_name", null),
                            Address = DRE.GetNullableString(reader, "address", null),
                            CountryId = DRE.GetNullableInt32(reader, "country_id", null),
                            CountryName = DRE.GetNullableString(reader, "country_name", null),
                            StateId = DRE.GetNullableInt32(reader, "state_id", 0),
                            StateName = DRE.GetNullableString(reader, "state_name", null),
                            CityId = DRE.GetNullableInt32(reader, "city_id", 0),
                            CityName = DRE.GetNullableString(reader, "city_name", null),
                            Area = DRE.GetNullableString(reader, "area", null),
                            EmailId = DRE.GetNullableString(reader, "email_id", null),
                            ContactNos = DRE.GetNullableString(reader, "contact_nos", null),
                            GSTNo = DRE.GetNullableString(reader, "gst_no", null),
                            SrNo = DRE.GetNullableInt64(reader, "sr_no", null)
                        };

                        clientAddress = _clientAddress;
                    }
                }
            }

            return clientAddress;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="clientAddresseeName"></param>
        /// <returns></returns>
        public Entities.ClientAddress GetClientAddressByName(string clientAddresseeName)
        {
            var clientAddress = new Entities.ClientAddress();

            DbCommand dbCommand = null;

            using (dbCommand = database.GetStoredProcCommand(DBStoredProcedure.GetClientAddressByName))
            {
                database.AddInParameter(dbCommand, "@client_address_name", DbType.String, clientAddresseeName);

                using (IDataReader reader = database.ExecuteReader(dbCommand))
                {
                    while (reader.Read())
                    {
                        var _clientAddress = new Entities.ClientAddress
                        {
                            ClientTypeId = DRE.GetNullableInt32(reader, "client_type_id", null),
                            ClientType = DRE.GetNullableString(reader, "client_type", null),
                            ClientId = DRE.GetNullableInt32(reader, "client_id", 0),
                            ClientName = DRE.GetNullableString(reader, "client_name", null),
                            AddressTypeId = DRE.GetNullableInt32(reader, "address_type_id", 0),
                            AddressType = DRE.GetNullableString(reader, "address_type", null),
                            ClientAddressId = DRE.GetNullableInt32(reader, "client_address_id", 0),
                            ClientAddressName = DRE.GetNullableString(reader, "client_address_name", null),
                            Address = DRE.GetNullableString(reader, "address", null),
                            CountryId = DRE.GetNullableInt32(reader, "country_id", null),
                            CountryName = DRE.GetNullableString(reader, "country_name", null),
                            StateId = DRE.GetNullableInt32(reader, "state_id", 0),
                            StateName = DRE.GetNullableString(reader, "state_name", null),
                            CityId = DRE.GetNullableInt32(reader, "city_id", 0),
                            CityName = DRE.GetNullableString(reader, "city_name", null),
                            Area = DRE.GetNullableString(reader, "area", null),
                            EmailId = DRE.GetNullableString(reader, "email_id", null),
                            ContactNos = DRE.GetNullableString(reader, "contact_nos", null),
                            GSTNo = DRE.GetNullableString(reader, "gst_no", null),
                            SrNo = DRE.GetNullableInt64(reader, "sr_no", null)
                        };

                        clientAddress = _clientAddress;
                    }
                }
            }

            return clientAddress;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="clientAddress"></param>
        /// <returns></returns>
        private Int32 UpdateClientAddress(Entities.ClientAddress clientAddress)
        {
            var clientAddressId = 0;

            DbCommand dbCommand = null;

            try
            {
                using (dbCommand = database.GetStoredProcCommand(DBStoredProcedure.UpdateClientAddress))
                {
                    database.AddInParameter(dbCommand, "@client_id", DbType.Int32, clientAddress.ClientId == null || clientAddress.ClientId == 0 ? (object)DBNull.Value : clientAddress.ClientId);
                    database.AddInParameter(dbCommand, "@address_type_id", DbType.Int32, clientAddress.AddressTypeId == null || clientAddress.AddressTypeId == 0 ? (object)DBNull.Value : clientAddress.AddressTypeId);
                    database.AddInParameter(dbCommand, "@client_address_id", DbType.Int32, clientAddress.ClientAddressId == null || clientAddress.ClientAddressId == 0 ? (object)DBNull.Value : clientAddress.ClientAddressId);
                    database.AddInParameter(dbCommand, "@client_address_name", DbType.String, string.IsNullOrEmpty(clientAddress.ClientAddressName) ? (object)DBNull.Value : clientAddress.ClientAddressName);
                    database.AddInParameter(dbCommand, "@address", DbType.String, string.IsNullOrEmpty(clientAddress.Address) ? (object)DBNull.Value : clientAddress.Address);
                    database.AddInParameter(dbCommand, "@country_id", DbType.Int32, clientAddress.CountryId == null || clientAddress.CountryId == 0 ? (object)DBNull.Value : clientAddress.CountryId);
                    database.AddInParameter(dbCommand, "@state_id", DbType.Int32, clientAddress.StateId == null || clientAddress.StateId == 0 ? (object)DBNull.Value : clientAddress.StateId);
                    database.AddInParameter(dbCommand, "@city_id", DbType.Int32, clientAddress.CityId == null || clientAddress.CityId == 0 ? (object)DBNull.Value : clientAddress.CityId);
                    database.AddInParameter(dbCommand, "@area", DbType.String, string.IsNullOrEmpty(clientAddress.Area) ? (object)DBNull.Value : clientAddress.Area);
                    database.AddInParameter(dbCommand, "@pin_code", DbType.String, string.IsNullOrEmpty(clientAddress.PinCode) ? (object)DBNull.Value : clientAddress.PinCode);
                    database.AddInParameter(dbCommand, "@tel_no", DbType.String, string.IsNullOrEmpty(clientAddress.TelNo) ? (object)DBNull.Value : clientAddress.TelNo);
                    database.AddInParameter(dbCommand, "@fax_no", DbType.String, string.IsNullOrEmpty(clientAddress.FaxNo) ? (object)DBNull.Value : clientAddress.FaxNo);
                    database.AddInParameter(dbCommand, "@email_id", DbType.String, string.IsNullOrEmpty(clientAddress.EmailId) ? (object)DBNull.Value : clientAddress.EmailId);
                    database.AddInParameter(dbCommand, "@contact_nos", DbType.String, string.IsNullOrEmpty(clientAddress.ContactNos) ? (object)DBNull.Value : clientAddress.ContactNos);
                    database.AddInParameter(dbCommand, "@service_tax_no", DbType.String, string.IsNullOrEmpty(clientAddress.ServiceTaxNo) ? (object)DBNull.Value : clientAddress.ServiceTaxNo);
                    database.AddInParameter(dbCommand, "@vat_no", DbType.String, string.IsNullOrEmpty(clientAddress.VATNo) ? (object)DBNull.Value : clientAddress.VATNo);
                    database.AddInParameter(dbCommand, "@tin_no", DbType.String, string.IsNullOrEmpty(clientAddress.TINNo) ? (object)DBNull.Value : clientAddress.TINNo);
                    database.AddInParameter(dbCommand, "@pan_no", DbType.String, string.IsNullOrEmpty(clientAddress.PANNo) ? (object)DBNull.Value : clientAddress.PANNo);
                    database.AddInParameter(dbCommand, "@gst_no", DbType.String, string.IsNullOrEmpty(clientAddress.GSTNo) ? (object)DBNull.Value : clientAddress.GSTNo);
                    database.AddInParameter(dbCommand, "@modified_by", DbType.Int32, clientAddress.ModifiedBy);
                    database.AddInParameter(dbCommand, "@modified_by_ip", DbType.String, clientAddress.ModifiedByIP);

                    database.AddOutParameter(dbCommand, "@return_value", DbType.Int32, 0);

                    clientAddressId = database.ExecuteNonQuery(dbCommand);

                    if (database.GetParameterValue(dbCommand, "@return_value") != DBNull.Value)
                    {
                        clientAddressId = Convert.ToInt32(database.GetParameterValue(dbCommand, "@return_value"));
                    }
                }
            }
            catch (Exception e)
            {
                throw e;
            }
            finally
            {
                dbCommand = null;
            }

            return clientAddressId;
        }

        private Int32 UpdateClientAddress(Entities.ClientAddress clientAddress, DbTransaction transaction)
        {
            var clientAddressId = 0;

            DbCommand dbCommand = null;

            try
            {
                using (dbCommand = database.GetStoredProcCommand(DBStoredProcedure.UpdateClientAddress))
                {
                    database.AddInParameter(dbCommand, "@client_id", DbType.Int32, clientAddress.ClientId == null || clientAddress.ClientId == 0 ? (object)DBNull.Value : clientAddress.ClientId);
                    database.AddInParameter(dbCommand, "@address_type_id", DbType.Int32, clientAddress.AddressTypeId == null || clientAddress.AddressTypeId == 0 ? (object)DBNull.Value : clientAddress.AddressTypeId);
                    database.AddInParameter(dbCommand, "@client_address_id", DbType.Int32, clientAddress.ClientAddressId == null || clientAddress.ClientAddressId == 0 ? (object)DBNull.Value : clientAddress.ClientAddressId);
                    database.AddInParameter(dbCommand, "@client_address_name", DbType.String, string.IsNullOrEmpty(clientAddress.ClientAddressName) ? (object)DBNull.Value : clientAddress.ClientAddressName);
                    database.AddInParameter(dbCommand, "@address", DbType.String, string.IsNullOrEmpty(clientAddress.Address) ? (object)DBNull.Value : clientAddress.Address);
                    database.AddInParameter(dbCommand, "@country_id", DbType.Int32, clientAddress.CountryId == null || clientAddress.CountryId == 0 ? (object)DBNull.Value : clientAddress.CountryId);
                    database.AddInParameter(dbCommand, "@state_id", DbType.Int32, clientAddress.StateId == null || clientAddress.StateId == 0 ? (object)DBNull.Value : clientAddress.StateId);
                    database.AddInParameter(dbCommand, "@city_id", DbType.Int32, clientAddress.CityId == null || clientAddress.CityId == 0 ? (object)DBNull.Value : clientAddress.CityId);
                    database.AddInParameter(dbCommand, "@area", DbType.String, string.IsNullOrEmpty(clientAddress.Area) ? (object)DBNull.Value : clientAddress.Area);
                    database.AddInParameter(dbCommand, "@pin_code", DbType.String, string.IsNullOrEmpty(clientAddress.PinCode) ? (object)DBNull.Value : clientAddress.PinCode);
                    database.AddInParameter(dbCommand, "@tel_no", DbType.String, string.IsNullOrEmpty(clientAddress.TelNo) ? (object)DBNull.Value : clientAddress.TelNo);
                    database.AddInParameter(dbCommand, "@fax_no", DbType.String, string.IsNullOrEmpty(clientAddress.FaxNo) ? (object)DBNull.Value : clientAddress.FaxNo);
                    database.AddInParameter(dbCommand, "@email_id", DbType.String, string.IsNullOrEmpty(clientAddress.EmailId) ? (object)DBNull.Value : clientAddress.EmailId);
                    database.AddInParameter(dbCommand, "@contact_nos", DbType.String, string.IsNullOrEmpty(clientAddress.ContactNos) ? (object)DBNull.Value : clientAddress.ContactNos);
                    database.AddInParameter(dbCommand, "@service_tax_no", DbType.String, string.IsNullOrEmpty(clientAddress.ServiceTaxNo) ? (object)DBNull.Value : clientAddress.ServiceTaxNo);
                    database.AddInParameter(dbCommand, "@vat_no", DbType.String, string.IsNullOrEmpty(clientAddress.VATNo) ? (object)DBNull.Value : clientAddress.VATNo);
                    database.AddInParameter(dbCommand, "@tin_no", DbType.String, string.IsNullOrEmpty(clientAddress.TINNo) ? (object)DBNull.Value : clientAddress.TINNo);
                    database.AddInParameter(dbCommand, "@pan_no", DbType.String, string.IsNullOrEmpty(clientAddress.PANNo) ? (object)DBNull.Value : clientAddress.PANNo);
                    database.AddInParameter(dbCommand, "@gst_no", DbType.String, string.IsNullOrEmpty(clientAddress.GSTNo) ? (object)DBNull.Value : clientAddress.GSTNo);
                    database.AddInParameter(dbCommand, "@modified_by", DbType.Int32, clientAddress.ModifiedBy);
                    database.AddInParameter(dbCommand, "@modified_by_ip", DbType.String, clientAddress.ModifiedByIP);

                    database.AddOutParameter(dbCommand, "@return_value", DbType.Int32, 0);

                    clientAddressId = database.ExecuteNonQuery(dbCommand, transaction);

                    if (database.GetParameterValue(dbCommand, "@return_value") != DBNull.Value)
                    {
                        clientAddressId = Convert.ToInt32(database.GetParameterValue(dbCommand, "@return_value"));
                    }
                }
            }
            catch (Exception e)
            {
                throw e;
            }
            finally
            {
                dbCommand = null;
            }

            return clientAddressId;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="clientAddress"></param>
        /// <returns></returns>
        public Int32 SaveClientAddress(Entities.ClientAddress clientAddress)
        {
            var clientAddressId = 0;

            if (clientAddress.ClientAddressId == null || clientAddress.ClientAddressId == 0)
            {
                var result = IsClientAddresseeNameExists((int)clientAddress.ClientId, clientAddress.ClientAddressName);

                if (result == false)
                {
                    clientAddressId = AddClientAddress(clientAddress);
                }
                else
                {
                    clientAddressId = -1;
                }
            }
            else if (clientAddress.IsDeleted == true)
                {
                   var result = DeleteClientAddress(clientAddress);
                }
            else if(clientAddress.ModifiedBy > 0 || clientAddress.ModifiedBy != null)
            {
                clientAddressId =  UpdateClientAddress(clientAddress);
            }

            return clientAddressId;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="clientAddress"></param>
        /// <param name="transaction"></param>
        /// <returns></returns>
        public Int32 SaveClientAddress(Entities.ClientAddress clientAddress, DbTransaction transaction)
        {
            var clientAddressId = 0;

            if (clientAddress.ClientAddressId == null || clientAddress.ClientAddressId == 0)
            {
                //var result = IsClientAddresseeNameExists((int)clientAddress.ClientId, clientAddress.ClientAddressName);

                //if (result == false)
                //{
                    clientAddressId = AddClientAddress(clientAddress, transaction);
                //}
                //else
                //{
                //    clientAddressId = -1;
                //}
            }
            else if (clientAddress.IsDeleted == true)
            {
                var result = DeleteClientAddress(clientAddress, transaction);

                if (result)
                {
                    clientAddressId = (int)clientAddress.ClientAddressId;
                }
            }
            else if (clientAddress.ModifiedBy > 0 || clientAddress.ModifiedBy != null)
            {
                clientAddressId = UpdateClientAddress(clientAddress, transaction);
            }

            return clientAddressId;
        }
    }
}
