using SOFARCH.HealthScreening.DataModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Remoting.Messaging;
using System.Text;
using System.Threading.Tasks;

namespace SOFARCH.HealthScreening.Business
{
    public class AccountHead
    {
        private readonly DataModel.AccountHead _accountHead;

        public AccountHead()
        {
            _accountHead = new DataModel.AccountHead();
        }

        public List<Entities.AccountHead> GetAllAccountHeads()
        {
            return _accountHead.GetAllAccountHeads();
        }

        public Entities.AccountHead GetAccountHeadById(Int32 accountHeadId)
        {
            return _accountHead.GetAccountHeadById(accountHeadId);
        }

        public Entities.AccountHead GetAccountHeadByName(string accountHeadName)
        {
            return _accountHead.GetAccountHeadByName(accountHeadName);
        }

        public List<Entities.AccountHead> SearchAllAccountHeads()
        {
            return _accountHead.SearchAllAccountHeads();
        }

        public List<Entities.AccountHead> SearchAccountHeadByName(string accountHeadName)
        {
            return _accountHead.SearchAccountHeadByName(accountHeadName);
        }

        public Int32 SaveAccountHead(Entities.AccountHead accountHead)
        {
            return _accountHead.SaveAccountHead(accountHead);
        }

    }
}
