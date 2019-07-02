<%@ Page Title="Purchase Bill Return" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="PurchaseBillReturn.aspx.cs" Inherits="HealthScreeningApp.Transactions.PurchaseBillReturn" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="cpMaster" runat="server">

    <div class="action-toolbar">

        <a href="#" id="AddNewPurchaseBillReturn"><i class="fa fa-plus fa-fw"></i>New</a>
        <a href="#" id="ShowPurchaseBillReturnList"><i class="fa fa-list fa-fw"></i>List</a>
        <a href="#" id="ViewPurchaseBillReturn"><i class="fa fa-eye fa-fw"></i>View</a>
        <a href="#" id="EditPurchaseBillReturn"><i class="fa fa-edit fa-fw"></i>Edit</a>
        <a href="#" id="SavePurchaseBillReturn"><i class="fa fa-save fa-fw"></i>Save</a>
        <a href="#" id="DeletePurchaseBillReturn"><i class="fa fa-remove fa-fw"></i>Delete</a>
        <a href="#" id="PrintPurhcaseBillList"><i class="fa fa-print fa-fw"></i>Print</a>
        <a href="#" id="FilterPurchaseBillReturn"><i class="fa fa-filter fa-fw"></i>Filter</a>
        <a href="#" id="ExportPurchaseBillReturnList"><i class="fa fa-cog fa-fw"></i>Export</a>

    </div>

    <div class="st-content">

        <div class="container-fluid">

            <div class="page-header">
                <h3>Purchase Bill Return</h3>
            </div>

            <div id="Loader" class="loader-container">
                <!--There's the container that centers it-->
                <div class="spinner-frame">
                    <!--The background-->
                    <div class="spinner-cover"></div>
                    <!--The foreground-->
                    <div class="spinner-bar"></div>
                    <!--and the spinny thing-->
                </div>

            </div>
            <!-- .loader-container -->

            <div id="ViewMode">

                <div class="row">

                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">

                        <!-- Filter Options -->

                        <div class="panel panel-default hide" id="SearchPurchaseBillReturn">

                            <div class="panel-heading">

                                <div class="row">

                                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">

                                        <h4 class="panel-title panel-title-align-middle">Search Purchase Bills</h4>

                                    </div>

                                </div>

                            </div>

                            <div class="panel-body">

                                <div class="row">

                                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">

                                        <div class="col-lg-2 col-md-2 col-sm-4 col-xs-12">
                                            <div class="form-group form-group-md">
                                                <label>Search Options</label>
                                                <select id="SearchOptions" class="form-control"></select>
                                            </div>
                                        </div>

                                        <div class="col-lg-3 col-md-4 col-sm-4 col-xs-12">
                                            <div class="form-group form-group-md">
                                                <label>Search Value</label>
                                                <input type="text" id="SearchValue" class="form-control" />
                                            </div>
                                        </div>

                                        <div class="col-lg-3 col-md-4 col-sm-4 col-xs-12">
                                            <div class="form-group form-group-md">
                                                <button type="button" id="Search" class="btn btn-info btn-md" style="margin-top: 26px;">Search</button>
                                            </div>
                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                        <!-- Filter Options -->

                    </div>

                </div>

                <div class="row">

                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">

                        <div class="panel panel-info">

                            <div class="panel-heading">
                                <h4 class="panel-title">List of Purchase Return Bills</h4>
                            </div>

                            <div class="panel-body">
                                <table id="PurchaseBillReturnList" class="table table-condesed">
                                    <thead>
                                        <tr>
                                            <th class="text-center">Action</th>
                                            <th class="text-center">Supplier</th>
                                            <th class="text-center">Purchase Bill No.</th>
                                            <th class="text-center">Return date</th>
                                            <th class="text-center">Return Qty</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                </table>
                            </div>

                            <div class="panel-footer">
                                <div class="row">
                                    <div class="col-lg-4 col-md-4 col-sm-4 col-xs-4">Page 1 of 5</div>
                                    <div class="col-lg-8 col-lg-8 col-sm-8 col-xs-12">
                                        <ul class="pagination pagination-sm pull-right">
                                            <li class="page-item">
                                                <a class="page-link" href="#" tabindex="-1">Previous</a>
                                            </li>
                                            <li class="page-item"><a class="page-link" href="#">1</a></li>
                                            <li class="page-item"><a class="page-link" href="#">2</a></li>
                                            <li class="page-item"><a class="page-link" href="#">3</a></li>
                                            <li class="page-item"><a class="page-link" href="#">Next</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>

            </div>

            <div id="EditMode">

                <div class="row">

                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">

                        <div class="panel panel-info">

                            <div class="panel-heading">
                                <h3 class="panel-title"></h3>
                            </div>

                            <div class="panel-body">

                                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">

                                    <div class="col-lg-2 col-md-2 col-sm-4 col-xs-12">
                                        <div class="form-group form-group-md">
                                            <label>Fin. Year</label>
                                            <select id="SearchFinancialYear" class="form-control"></select>
                                        </div>
                                    </div>

                                    <div class="col-lg-2 col-md-2 col-sm-4 col-xs-12">
                                        <div class="form-group form-group-md">
                                            <label>Search Purchase Bill No.</label>
                                            <input type="text" id="SearchPurchaseBillNo" class="form-control" />
                                        </div>
                                        <div id="SearchPurchaseBillNos" class="autocompleteList"></div>
                                    </div>

                                </div>

                                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">

                                    <div class="col-lg-4 col-md-4 col-sm-6 co-xs-12">
                                        <div class="form-group form-group-md">
                                            <label>Supplier</label>
                                            <input type="text" id="Vendor" class="form-control" disabled="disabled" />
                                        </div>
                                    </div>

                                    <div class="col-lg-4 col-md-4 col-sm-6 co-xs-12">
                                        <div class="form-group form-group-md">
                                            <label>Purchase Bill No.</label>
                                            <input type="text" id="PurchaseBillNo" class="form-control" disabled="disabled" />
                                        </div>
                                    </div>

                                    <div class="col-lg-4 col-md-4 col-sm-6 co-xs-12">
                                        <div class="form-group form-group-md">
                                            <label>Purchase Bill Date</label>
                                            <input type="text" id="PurchaseBillDate" class="form-control" disabled="disabled" />
                                        </div>
                                    </div>

                                </div>

                                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">

                                    <div class="col-lg-2 col-md-2 col-sm-4 col-xs-12">
                                        <div class="form-group form-group-md">
                                            <label>Fin. Year</label>
                                            <select id="FinancialYear" class="form-control"></select>
                                        </div>
                                    </div>

                                    <div class="col-lg-2 col-md-2 col-sm-4 col-xs-12">
                                        <div class="form-group form-group-md">
                                            <label>Return Bill No.</label>
                                            <input type="text" id="PurchaseBillReturnNo" class="form-control" disabled="disabled" placeholder="Auto Generated" />
                                        </div>
                                    </div>

                                    <div class="col-lg-2 col-md-2 col-sm-4 col-xs-12">
                                        <div class="form-group form-group-md">
                                            <label>Purchase Bill Return Date</label>
                                            <div class="input-group date input-group-md" id="PurchaseBillReturnDateDatePicker">
                                                <input type="text" id="PurchaseBillReturnDate" class="form-control" />
                                                <span class="input-group-addon">
                                                    <i class="fa fa-calendar"></i>
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                                        <div class="form-group form-group-md">
                                            <label>Remarks</label>
                                            <textarea id="Remarks" class="form-control" rows="4"></textarea>
                                        </div>
                                    </div>

                                </div>

                            </div>

                        </div>

                        <div class="panel panel-info">

                            <div class="panel-heading">
                                <h3 class="panel-title"></h3>
                            </div>

                            <div class="panel-body">

                                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                    <div class="table-responsive" style="max-height: 300px; overflow: auto;">
                                        <table id="PurchaseBillReturnItemList" class="table table-condensed">
                                            <thead>
                                                <tr>
                                                    <th class="text-center">Action</th>
                                                    <th class="text-center">Drug Code</th>
                                                    <th class="text-center">Drug Name</th>
                                                    <th class="text-center">Purchase Qty</th>
                                                    <th class="text-center">Return Qty</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            </tbody>
                                            <tfoot></tfoot>
                                        </table>
                                    </div>
                                </div>

                            </div>

                        </div>

                        <div class="panel panel-info" style="display: none;">

                            <div class="panel-body">
                                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">


                                    <div class="form-horizontal">

                                        <div class="pull-right">

                                            <div class="form-group form-group-md">
                                                <label class="col-lg-6">Total Item Amount</label>
                                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                                    <input type="text" id="TotalItemAmount" class="form-control" readonly="readonly" />
                                                </div>
                                            </div>

                                            <div class="form-group form-group-md">
                                                <label class="col-lg-6">Purchase Bill Amount</label>
                                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                                    <input type="text" id="PurchaseBillAmount" class="form-control" />
                                                </div>
                                            </div>

                                            <div class="form-group form-group-md">
                                                <label class="col-lg-6">Adjusted Amount</label>
                                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                                    <input type="text" id="AdjustedAmount" class="form-control" readonly="readonly" />
                                                </div>
                                            </div>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    </div>

    <script type="text/javascript" src="../content/scripts/app/shared/default.js"></script>
    <script type="text/javascript" src="../content/scripts/app/purchase/purchase-bill-return.js"></script>

</asp:Content>
