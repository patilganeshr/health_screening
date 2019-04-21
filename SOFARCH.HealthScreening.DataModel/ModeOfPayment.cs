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
    public class ModeOfPayment
    {
        private readonly Database database;

        public ModeOfPayment()
        {
            database = DBConnect.getDBConnection();
        }

        public List<Entities.ModeOfPayment> GetAllModeOfPayments()
        {
            var modeOfPayments = new List<Entities.ModeOfPayment>();

            DbCommand dbCommand = null;

            try
            {
                using (dbCommand = database.GetStoredProcCommand(DBStoredProcedure.GetListOfAllModeOfPayments))
                {
                    using (IDataReader reader = database.ExecuteReader(dbCommand))
                    {
                        while (reader.Read())
                        {
                            var modeOfPayment = new Entities.ModeOfPayment
                            {
                                ModeOfPaymentId = DRE.GetNullableInt32(reader, "mode_of_payment_id", 0),
                                PaymentMode = DRE.GetNullableString(reader, "mode_of_payment", null),
                                guid = DRE.GetNullableGuid(reader, "row_guid", null)
                            };

                            modeOfPayments.Add(modeOfPayment);
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

            return modeOfPayments;
        }
    }
}
