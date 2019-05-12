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
    public class Client
    {
        private readonly Database database;

        public Client()
        {
            database = DBConnect.getDBConnection();
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="client"></param>
        /// <returns></returns>
        private Int32 AddClient(Entities.Client client)
        {
            var clientId = 0;

            DbCommand dbCommand = null;

            try
            {
                using (dbCommand = database.GetStoredProcCommand(DBStoredProcedure.InsertClient))
                {
                    database.AddInParameter(dbCommand, "@client_type_id", DbType.Int32, client.ClientTypeId);
                    database.AddInParameter(dbCommand, "@client_id", DbType.Int32, client.ClientId);
                    database.AddInParameter(dbCommand, "@client_name", DbType.String, client.ClientName);
                    database.AddInParameter(dbCommand, "@created_by", DbType.Int32, client.CreatedBy);
                    database.AddInParameter(dbCommand, "@created_by_ip", DbType.String, client.CreatedByIP);

                    database.AddOutParameter(dbCommand, "@return_value", DbType.Int32, 0);

                    clientId = database.ExecuteNonQuery(dbCommand);

                    if (database.GetParameterValue(dbCommand, "@return_value") != DBNull.Value)
                    {
                        clientId = Convert.ToInt32(database.GetParameterValue(dbCommand, "@return_value"));
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

            return clientId;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="client"></param>
        /// <param name="transaction"></param>
        /// <returns></returns>
        private Int32 AddClient(Entities.Client client, DbTransaction transaction)
        {
            var clientId = 0;

            DbCommand dbCommand = null;

            try
            {
                using (dbCommand = database.GetStoredProcCommand(DBStoredProcedure.InsertClient))
                {
                    database.AddInParameter(dbCommand, "@client_type_id", DbType.Int32, client.ClientTypeId);
                    database.AddInParameter(dbCommand, "@client_id", DbType.Int32, client.ClientId);
                    database.AddInParameter(dbCommand, "@client_name", DbType.String, client.ClientName);
                    database.AddInParameter(dbCommand, "@pan_no", DbType.String, client.PANNo);
                    database.AddInParameter(dbCommand, "@created_by", DbType.Int32, client.CreatedBy);
                    database.AddInParameter(dbCommand, "@created_by_ip", DbType.String, client.CreatedByIP);

                    database.AddOutParameter(dbCommand, "@return_value", DbType.Int32, 0);

                    clientId = database.ExecuteNonQuery(dbCommand, transaction);

                    if (database.GetParameterValue(dbCommand, "@return_value") != DBNull.Value)
                    {
                        clientId = Convert.ToInt32(database.GetParameterValue(dbCommand, "@return_value"));
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

            return clientId;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="client"></param>
        /// <returns></returns>
        public bool DeleteClient(Entities.Client client)
        {
            bool isDeleted = false;

            DbCommand dbCommand = null;

            try
            {
                using (dbCommand = database.GetStoredProcCommand(DBStoredProcedure.DeleteClient))
                {
                    database.AddInParameter(dbCommand, "@client_id", DbType.Int32, client.ClientId);
                    database.AddInParameter(dbCommand, "@modified_by", DbType.Int32, client.ModifiedBy);
                    database.AddInParameter(dbCommand, "@modified_by_ip", DbType.String, client.ModifiedByIP);

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

        public bool IsClientNameExists(string clientName)
        {
            bool isClientNameExists = false;

            DbCommand dbCommand = null;

            try
            {
                using (dbCommand = database.GetStoredProcCommand(DBStoredProcedure.CheckClientNameIsExists))
                {
                    database.AddInParameter(dbCommand, "@client_name", DbType.String, clientName);

                    using (IDataReader reader = database.ExecuteReader(dbCommand))
                    {
                        while (reader.Read())
                        {
                            isClientNameExists = DRE.GetBoolean(reader, "is_client_name_exists");
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

            return isClientNameExists;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public List<Entities.Client> GetAllClients()
        {
            var clients = new List<Entities.Client>();

            DbCommand dbCommand = null;

            try
            {
                using (dbCommand = database.GetStoredProcCommand(DBStoredProcedure.GetAllClients))
                {
                    using (IDataReader reader = database.ExecuteReader(dbCommand))
                    {
                        while (reader.Read())
                        {
                            ClientAddress clientAddress = new ClientAddress();

                            var client = new Entities.Client
                            {
                                ClientTypeId = DRE.GetNullableInt32(reader, "client_type_id", 0),
                                ClientTypeName = DRE.GetNullableString(reader, "client_type", null),
                                ClientId = DRE.GetNullableInt32(reader, "client_id", 0),
                                ClientCode = DRE.GetNullableString(reader, "client_code", null),
                                ClientName = DRE.GetNullableString(reader, "client_name", null),
                                PANNo = DRE.GetNullableString(reader, "pan_no", null),
                                SrNo = DRE.GetNullableInt64(reader, "sr_no", null),
                                ClientAddressess = clientAddress.GetAllClientAddressessByClientId(DRE.GetInt32(reader, "client_id"))
                            };

                            clients.Add(client);
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

            return clients;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="clientId"></param>
        /// <returns></returns>
        public Entities.Client GetClientById(Int32 clientId)
        {
            var client = new Entities.Client();

            DbCommand dbCommand = null;

            using (dbCommand = database.GetStoredProcCommand(DBStoredProcedure.GetClientById))
            {
                database.AddInParameter(dbCommand, "@client_id", DbType.Int32, clientId);

                using (IDataReader reader = database.ExecuteReader(dbCommand))
                {
                    while (reader.Read())
                    {
                        var _client = new Entities.Client
                        {
                            ClientTypeId = DRE.GetNullableInt32(reader, "client_type_id", 0),
                            ClientTypeName = DRE.GetNullableString(reader, "client_type", null),
                            ClientId = DRE.GetNullableInt32(reader, "client_id", 0),
                            ClientName = DRE.GetNullableString(reader, "client_name", null),
                            PANNo = DRE.GetNullableString(reader, "pan_no", null)
                        };

                        client = _client;
                    }
                }
            }

            return client;
        }
        
        /// <summary>
        /// 
        /// </summary>
        /// <param name="clientName"></param>
        /// <returns></returns>
        public Entities.Client GetClientByName(string clientName)
        {
            var client = new Entities.Client();

            DbCommand dbCommand = null;

            using (dbCommand = database.GetStoredProcCommand(DBStoredProcedure.GetClientByName))
            {
                database.AddInParameter(dbCommand, "@client_name", DbType.String, clientName);

                using (IDataReader reader = database.ExecuteReader(dbCommand))
                {
                    while (reader.Read())
                    {
                        var _client = new Entities.Client
                        {
                            ClientTypeId = DRE.GetNullableInt32(reader, "client_type_id", 0),
                            ClientTypeName = DRE.GetNullableString(reader, "client_type", null),
                            ClientId = DRE.GetNullableInt32(reader, "client_id", 0),
                            ClientName = DRE.GetNullableString(reader, "client_name", null),
                            PANNo = DRE.GetNullableString(reader, "pan_no", null)
                        };

                        client = _client;
                    }
                }
            }

            return client;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="client"></param>
        /// <returns></returns>
        private Int32 UpdateClient(Entities.Client client)
        {
            var clientId = 0;

            DbCommand dbCommand = null;

            try
            {
                using (dbCommand = database.GetStoredProcCommand(DBStoredProcedure.UpdateClient))
                {
                    database.AddInParameter(dbCommand, "@client_type_id", DbType.Int32, client.ClientTypeId);
                    database.AddInParameter(dbCommand, "@client_id", DbType.Int32, client.ClientId);
                    database.AddInParameter(dbCommand, "@client_name", DbType.String, client.ClientName);
                    database.AddInParameter(dbCommand, "@pan_no", DbType.String, client.PANNo);
                    database.AddInParameter(dbCommand, "@modified_by", DbType.Int32, client.ModifiedBy);
                    database.AddInParameter(dbCommand, "@modified_by_ip", DbType.String, client.ModifiedByIP);

                    database.AddOutParameter(dbCommand, "@return_value", DbType.Int32, 0);

                    clientId = database.ExecuteNonQuery(dbCommand);

                    if (database.GetParameterValue(dbCommand, "@return_value") != DBNull.Value)
                    {
                        clientId = Convert.ToInt32(database.GetParameterValue(dbCommand, "@return_value"));
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

            return clientId;
        }

        private Int32 UpdateClient(Entities.Client client, DbTransaction transaction)
        {
            var clientId = 0;

            DbCommand dbCommand = null;

            try
            {
                using (dbCommand = database.GetStoredProcCommand(DBStoredProcedure.UpdateClient))
                {
                    database.AddInParameter(dbCommand, "@client_type_id", DbType.Int32, client.ClientTypeId);
                    database.AddInParameter(dbCommand, "@client_id", DbType.Int32, client.ClientId);
                    database.AddInParameter(dbCommand, "@client_name", DbType.String, client.ClientName);
                    database.AddInParameter(dbCommand, "@pan_no", DbType.String, client.PANNo);
                    database.AddInParameter(dbCommand, "@modified_by", DbType.Int32, client.ModifiedBy);
                    database.AddInParameter(dbCommand, "@modified_by_ip", DbType.String, client.ModifiedByIP);

                    database.AddOutParameter(dbCommand, "@return_value", DbType.Int32, 0);

                    clientId = database.ExecuteNonQuery(dbCommand, transaction);

                    if (database.GetParameterValue(dbCommand, "@return_value") != DBNull.Value)
                    {
                        clientId = Convert.ToInt32(database.GetParameterValue(dbCommand, "@return_value"));
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

            return clientId;
        }

        public Int32 SaveClient(List<Entities.Client> client)
        {
            var clientId = 0;

            var db = DBConnect.getDBConnection();

            using (DbConnection conn = db.CreateConnection())
            {
                conn.Open();

                using(DbTransaction transaction = conn.BeginTransaction())
                {
                    try
                    {
                        var clientAddressId = 0;

                        if (client.Count > 0)
                        {
                            foreach (Entities.Client c in client)
                            {
                                if (c.ClientId == null || c.ClientId == 0)
                                {
                                    var result = IsClientNameExists(c.ClientName);

                                    if (result == false)
                                    {
                                        clientId = AddClient(c, transaction);
                                    }
                                    else
                                    {
                                        clientId = -2;
                                    }
                                }
                                else
                                {
                                    clientId = UpdateClient(c, transaction);
                                }

                                if (clientId > 0)
                                {
                                    foreach (Entities.ClientAddress ca in c.ClientAddressess)
                                    {
                                        ca.ClientId = clientId;

                                        ClientAddress clientAddress = new ClientAddress();

                                        clientAddressId = clientAddress.SaveClientAddress(ca, transaction);

                                    }
                                }
                            }
                        }

                        transaction.Commit();
                    }
                    catch (Exception ex)
                    {
                        transaction.Rollback();
                        throw ex;
                    }
                    finally
                    {
                        db = null;
                    }
                }
            }

            return clientId;
        }
    }
}
