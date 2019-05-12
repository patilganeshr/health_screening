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
    public class ClientAddressContact
    {
        private readonly Database database;

        public ClientAddressContact()
        {
            database = DBConnect.getDBConnection();
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="clientAddressContact"></param>
        /// <returns></returns>
        private Int32 AddClientAddressContact(Entities.ClientAddressContact clientAddressContact)
        {
            var clientAddressContactId = 0;

            DbCommand dbCommand = null;

            try
            {
                using (dbCommand = database.GetStoredProcCommand(DBStoredProcedure.InsertClientAddressContact))
                {
                    database.AddInParameter(dbCommand, "@contact_id", DbType.Int32, clientAddressContact.ContactId);
                    database.AddInParameter(dbCommand, "@client_address_id", DbType.Int32, clientAddressContact.ClientAddressId);
                    database.AddInParameter(dbCommand, "@contact_name", DbType.String, clientAddressContact.ContactName);
                    database.AddInParameter(dbCommand, "@department", DbType.String, clientAddressContact.Department);
                    database.AddInParameter(dbCommand, "@designation", DbType.String, clientAddressContact.Designation);
                    database.AddInParameter(dbCommand, "@contact_no", DbType.String, clientAddressContact.ContactNo);
                    database.AddInParameter(dbCommand, "@email_id", DbType.String, clientAddressContact.EmailId);
                    database.AddInParameter(dbCommand, "@created_by", DbType.Int32, clientAddressContact.CreatedBy);
                    database.AddInParameter(dbCommand, "@created_by_ip", DbType.String, clientAddressContact.CreatedByIP);

                    database.AddOutParameter(dbCommand, "@return_value", DbType.Int32, 0);

                    clientAddressContactId = database.ExecuteNonQuery(dbCommand);

                    if (database.GetParameterValue(dbCommand, "@return_value") != DBNull.Value)
                    {
                        clientAddressContactId = Convert.ToInt32(database.GetParameterValue(dbCommand, "@return_value"));
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

            return clientAddressContactId;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="clientAddressContact"></param>
        /// <returns></returns>
        public bool DeleteClientAddressContactByClientAddressId(Entities.ClientAddressContact clientAddressContact)
        {
            bool isDeleted = false;

            DbCommand dbCommand = null;

            try
            {
                using (dbCommand = database.GetStoredProcCommand(DBStoredProcedure.DeleteClientAddressContactByClientAddressId))
                {
                    database.AddInParameter(dbCommand, "@client_address_id", DbType.Int32, clientAddressContact.ClientAddressId);
                    database.AddInParameter(dbCommand, "@modified_by", DbType.Int32, clientAddressContact.ModifiedBy);
                    database.AddInParameter(dbCommand, "@modified_by_ip", DbType.String, clientAddressContact.ModifiedByIP);

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

        /// <summary>
        /// 
        /// </summary>
        /// <param name="clientAddressContact"></param>
        /// <returns></returns>
        public bool DeleteClientAddressContactByContactId(Entities.ClientAddressContact clientAddressContact)
        {
            bool isDeleted = false;

            DbCommand dbCommand = null;

            try
            {
                using (dbCommand = database.GetStoredProcCommand(DBStoredProcedure.DeleteClientAddressContactByContactId))
                {
                    database.AddInParameter(dbCommand, "@contact_id", DbType.Int32, clientAddressContact.ContactId);
                    database.AddInParameter(dbCommand, "@modified_by", DbType.Int32, clientAddressContact.ModifiedBy);
                    database.AddInParameter(dbCommand, "@modified_by_ip", DbType.String, clientAddressContact.ModifiedByIP);

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

        /// <summary>
        /// 
        /// </summary>
        /// <param name="clientAddressId"></param>
        /// <returns></returns>
        public List<Entities.ClientAddressContact> GetAllClientAddressContats(Int32 clientAddressId)
        {
            var clientAddressContacts = new List<Entities.ClientAddressContact>();

            DbCommand dbCommand = null;

            try
            {
                using (dbCommand = database.GetStoredProcCommand(DBStoredProcedure.GetAllClientAddressContactsByClientAddressId))
                {
                    database.AddInParameter(dbCommand, "@client_address_id", DbType.Int32, clientAddressId);

                    using (IDataReader reader = database.ExecuteReader(dbCommand))
                    {
                        while (reader.Read())
                        {
                            var clientAddressContact = new Entities.ClientAddressContact
                            {
                                ContactId = DRE.GetNullableInt32(reader, "contact_id", 0),
                                ContactName = DRE.GetNullableString(reader, "contact_name", null)
                            };

                            clientAddressContacts.Add(clientAddressContact);
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

            return clientAddressContacts;
        }

        public Entities.ClientAddressContact GetClientAddressContactById(Int32 contactId)
        {
            var clientAddressContact = new Entities.ClientAddressContact();

            DbCommand dbCommand = null;

            using (dbCommand = database.GetStoredProcCommand(DBStoredProcedure.GetClientAddressContactById))
            {
                database.AddInParameter(dbCommand, "@contact_id", DbType.Int32, contactId);

                using (IDataReader reader = database.ExecuteReader(dbCommand))
                {
                    while (reader.Read())
                    {
                        var _clientAddressContact = new Entities.ClientAddressContact
                        {
                            ContactId = DRE.GetNullableInt32(reader, "contact_id", 0),
                            ClientAddressId = DRE.GetNullableInt32(reader, "client_address_id", null),
                            ClientAddressName = DRE.GetNullableString(reader, "client_address_name", null),
                            ContactName = DRE.GetNullableString(reader, "contact_name", null),
                            ContactNo = DRE.GetNullableString(reader, "contact_no", null),
                            Department = DRE.GetNullableString(reader, "department", null),
                            Designation = DRE.GetNullableString(reader, "designation", null),
                            EmailId = DRE.GetNullableString(reader, "emailid", null)
                        };

                        clientAddressContact = _clientAddressContact;
                    }
                }
            }

            return clientAddressContact;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="clientAddressContact"></param>
        /// <returns></returns>
        private Int32 UpdateClientAddressContact(Entities.ClientAddressContact clientAddressContact)
        {
            var clientAddressContactId = 0;

            DbCommand dbCommand = null;

            try
            {
                using (dbCommand = database.GetStoredProcCommand(DBStoredProcedure.UpdateClientAddressContact))
                {
                    database.AddInParameter(dbCommand, "@contact_id", DbType.Int32, clientAddressContact.ContactId);
                    database.AddInParameter(dbCommand, "@client_address_id", DbType.Int32, clientAddressContact.ClientAddressId);
                    database.AddInParameter(dbCommand, "@contact_name", DbType.String, clientAddressContact.ContactName);
                    database.AddInParameter(dbCommand, "@department", DbType.String, clientAddressContact.Department);
                    database.AddInParameter(dbCommand, "@designation", DbType.String, clientAddressContact.Designation);
                    database.AddInParameter(dbCommand, "@contact_no", DbType.String, clientAddressContact.ContactNo);
                    database.AddInParameter(dbCommand, "@email_id", DbType.String, clientAddressContact.EmailId);
                    database.AddInParameter(dbCommand, "@modified_by", DbType.Int32, clientAddressContact.ModifiedBy);
                    database.AddInParameter(dbCommand, "@modified_by_ip", DbType.String, clientAddressContact.ModifiedByIP);

                    database.AddOutParameter(dbCommand, "@return_value", DbType.Int32, 0);

                    clientAddressContactId = database.ExecuteNonQuery(dbCommand);

                    if (database.GetParameterValue(dbCommand, "@return_value") != DBNull.Value)
                    {
                        clientAddressContactId = Convert.ToInt32(database.GetParameterValue(dbCommand, "@return_value"));
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

            return clientAddressContactId;
        }

        public Int32 SaveClientAddressContact(Entities.ClientAddressContact clientAddressContact)
        {
            var clientAddressContactId = 0;

            if (clientAddressContact.ContactId == null || clientAddressContact.ContactId == 0)
            {
                clientAddressContactId = AddClientAddressContact(clientAddressContact);
            }
            else if (clientAddressContact.ModifiedBy > 0 || clientAddressContact.ModifiedBy != null)
            {
                clientAddressContactId = UpdateClientAddressContact(clientAddressContact);
            }
            else if(clientAddressContact.IsDeleted == true)
            {
                var result = DeleteClientAddressContactByContactId(clientAddressContact);
            }

            return clientAddressContactId;
        }
    }
}
