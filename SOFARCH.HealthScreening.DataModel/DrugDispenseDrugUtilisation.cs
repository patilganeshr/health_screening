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
    public class DrugDispenseDrugUtilisation
    {
        private readonly Database database;

        public DrugDispenseDrugUtilisation()
        {
            database = DBConnect.getDBConnection();
        }

        private Int32 AddDrugDispenseDrugUtilisationDetails(Entities.DrugDispenseDrugUtilisation drugDispenseDrugUtilisation, DbTransaction dbTransaction)
        {
            var drugDispenseDrugUtilisationId = 0;

            try
            {
                using (DbCommand dbCommand = database.GetStoredProcCommand(DBStoredProcedure.InsertDrugDispenseDrugUtilisation))
                {
                    database.AddInParameter(dbCommand, "@drug_utilisation_id", DbType.Int32, drugDispenseDrugUtilisation.DrugUtilisationId);
                    database.AddInParameter(dbCommand, "@drug_dispense_id", DbType.Int32, drugDispenseDrugUtilisation.DrugDispenseId);
                    database.AddInParameter(dbCommand, "@drug_id", DbType.Int32, drugDispenseDrugUtilisation.DrugId);
                    database.AddInParameter(dbCommand, "@dispense_qty", DbType.String, drugDispenseDrugUtilisation.DispenseQty);
                    database.AddInParameter(dbCommand, "@created_by", DbType.Int32, drugDispenseDrugUtilisation.CreatedBy);
                    database.AddInParameter(dbCommand, "@created_by_ip", DbType.String, drugDispenseDrugUtilisation.CreatedByIP);

                    database.AddOutParameter(dbCommand, "@return_value", DbType.Int32, 0);

                    drugDispenseDrugUtilisationId = database.ExecuteNonQuery(dbCommand, dbTransaction);

                    if (database.GetParameterValue(dbCommand, "@return_value") != DBNull.Value)
                    {
                        drugDispenseDrugUtilisationId = Convert.ToInt32(database.GetParameterValue(dbCommand, "@return_value"));
                    }
                }
            }
            catch (Exception e)
            {
                throw e;
            }

            return drugDispenseDrugUtilisationId;
        }


    }
}
