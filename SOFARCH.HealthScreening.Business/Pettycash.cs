using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using System;



namespace SOFARCH.HealthScreening.Business
{
    public  class Pettycash
    {
         private readonly DataModel.Pettycash  _Petty;

         public Pettycash()
        {
            _Petty = new DataModel.Pettycash();
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="employer"></param>
        /// <returns></returns>
         public Int32 SavePettycash(Entities.Pettycash Petty)
        {
            return _Petty.SavePettycash(Petty);
        }

         public List<Entities.Pettycash> GetAllPettyCashDocno()
        {
            return _Petty.GetAllPettyCashDocno();
        }


        public Entities.Pettycash  GetPettycashDetailsById(Int32 employerId)
        {
            return _Petty.GetPettycashDetailsById(employerId);
        }


        public List<Entities.AccountHead> GetAllAccountHeads()
        {
            return _Petty.GetAllAccountHeads();
        }

    }
}
