using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace SOFARCH.HealthScreening.Api.Controllers
{
    public class AccountHeadController : ApiController
    {
        private readonly Business.AccountHead _accountHead;

        public AccountHeadController()
        {
            _accountHead = new Business.AccountHead();
        }

        [Route("GetAllAccountHeads")]
        public List<Entities.AccountHead> GetAllAccountHeads()
        {
            return _accountHead.GetAllAccountHeads();
        }

        [Route("GetAccountHeadById/{accountHeadId}")]
        public Entities.AccountHead GetAccountHeadById(Int32 accountHeadId)
        {
            return _accountHead.GetAccountHeadById(accountHeadId);
        }

        [Route("GetAccountHeadByName/{accountHeadName}")]
        public Entities.AccountHead GetAccountHeadByName(string accountHeadName)
        {
            return _accountHead.GetAccountHeadByName(accountHeadName);
        }

        [HttpGet]
        [Route("SearchAllAccountHeads")]
        public List<Entities.AccountHead> SearchAllAccountHeads()
        {
            return _accountHead.SearchAllAccountHeads();
        }

        [HttpGet]
        [Route("SearchAccountHeadByName/{accountHeadName}")]
        public List<Entities.AccountHead> SearchAccountHeadByName(string accountHeadName)
        {
            return _accountHead.SearchAccountHeadByName(accountHeadName);
        }

        [HttpPost]
        [Route("SaveAccountHead")]
        public Int32 SaveAccountHead(Entities.AccountHead accountHead)
        {
            return _accountHead.SaveAccountHead(accountHead);
        }

    }
}
