<%@ Page Title="Client" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Client.aspx.cs" Inherits="HealthScreeningApp.Masters.Client" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="cpMaster" runat="server">

    <div class="action-toolbar">

        <a href="#" id="AddNewClient"><i class="fa fa-plus fa-fw"></i>New</a>
        <a href="#" id="ShowClientList"><i class="fa fa-list fa-fw"></i>List</a>
        <a href="#" id="ViewClient"><i class="fa fa-eye fa-fw"></i>View</a>
        <a href="#" id="EditClient"><i class="fa fa-edit fa-fw"></i>Edit</a>
        <a href="#" id="SaveClient"><i class="fa fa-save fa-fw"></i>Save</a>
        <a href="#" id="DeleteClient"><i class="fa fa-remove fa-fw"></i>Delete</a>
        <a href="#" id="PrintClientList"><i class="fa fa-print fa-fw"></i>Print</a>
        <a href="#" id="FilterClient"><i class="fa fa-filter fa-fw"></i>Filter</a>
        <a href="#" id="ExportClientList"><i class="fa fa-cog fa-fw"></i>Export</a>

    </div>

    
    <div class="st-content">

        <div class="container-fluid">

            <!-- CONTAINER START -->

            <div class="page-header text-center">
                <h3>Client Details</h3>
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

            <!-- EDIT PANEL -->

            <div id="EditMode">

                <div class="row">

                    <!-- CLIENT DETAILS -->

                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">

                        <div class="panel panel-info">

                            <div class="panel-heading">
                                <h3 class="panel-title">Client Details</h3>
                            </div>

                            <div class="panel-body">

                                <div class="row">

                                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">

                                        <div class="col-lg-3 col-md-4 col-sm-4 col-xs-12">
                                            <div class="form-group form-group-sm">
                                                <label>Client Type</label>
                                                <select id="ClientType" class="form-control input-sm"></select>
                                            </div>
                                        </div>

                                        <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                            <div class="form-group form-group-sm">
                                                <label>Client Name</label>
                                                <input type="text" id="ClientName" class="form-control input-sm" />
                                            </div>
                                        </div>

                                        <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                                            <div class="form-group form-group-sm">
                                                <label>PAN No.</label>
                                                <input type="text" id="PANNo" class="form-control input-sm" maxlength="10" />
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>

                        </div>

                    </div>

                    <!-- END OF CLIENT DETAILS -->

                    <!-- CLIENT ADDRESS DETAILS -->

                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">

                        <div class="panel panel-info">

                            <div class="panel-heading">

                                <h4 class="panel-title panel-title-align-middle">Client Address Details</h4>

                            </div>

                            <div class="action-toolbar-sub">

                                <div class="pull-right">

                                    <a href="#" id="AddNewClientAddress"><i class="fa fa-plus fa-fw"></i>New</a>
                                    <a href="#" id="ShowClientAddressList"><i class="fa fa-list fa-fw"></i>List</a>
                                    <a href="#" id="EditClientAddress"><i class="fa fa-edit fa-fw"></i>Edit</a>
                                    <a href="#" id="SaveClientAddress"><i class="fa fa-save fa-fw"></i>Save</a>
                                    <a href="#" id="SaveAndAddNewClientAddress"><i class="fa fa-plus-square fa-fw"></i>Save And Add New</a>
                                    <a href="#" id="DeleteClientAddress"><i class="fa fa-remove fa-fw"></i>Delete</a>

                                </div>
                            </div>

                            <div class="panel-body">

                                <div id="ClientAddressViewSection">

                                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">

                                        <div class="table-responsive">
                                            <table id="ClientAddressList" class="table table-condensed">
                                                <thead>
                                                    <tr>
                                                        <th>Action</th>
                                                        <th>Address Type</th>
                                                        <th>Client Name</th>
                                                        <th>Country</th>
                                                        <th>State</th>
                                                        <th>City</th>
                                                        <th>Contact No.'s</th>
                                                        <th>GST No.</th>                                                        
                                                    </tr>
                                                </thead>
                                                <tbody></tbody>
                                            </table>
                                        </div>
                                    </div>
                                
                                </div>

                                <div id="ClientAddressEditSection">
                                    
                                    <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                                        
                                        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                            <div class="form-group form-group-sm">
                                                <label>Address Type</label>
                                                <select id="AddressType" class="form-control input-sm"></select>
                                            </div>
                                        </div>

                                        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                            <div class="form-group form-group-sm">
                                                <label>Client Address Name</label>
                                                <input type="text" id="ClientAddressName" class="form-control input-sm" />
                                            </div>
                                        </div>
                                        
                                        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                            <div class="form-group form-group-sm">
                                                <label>Address</label>
                                                <textarea id="Address" class="form-control input-sm" rows="2"></textarea>
                                            </div>
                                        </div>

                                    </div>

                                    <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                                    
                                        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                            <div class="form-group">
                                                <label>Country</label>
                                                <select id="Country" class="form-control input-sm"></select>
                                            </div>
                                        </div>

                                        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                            <div class="form-group">
                                                <label>State</label>
                                                <select id="State" class="form-control input-sm"></select>
                                            </div>
                                        </div>

                                        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                            <div class="form-group">
                                                <label>City</label>
                                                <div class="input-group input-group-sm">
                                                    <select id="City" class="form-control input-sm"></select>
                                                    <span class="input-group-btn">
                                                        <button type="button" id="AddNewCity" name="NEW_CITY" class="btn btn-info">
                                                            <i class="fa fa-plus"></i>
                                                        </button>
                                                        <button type="button" id="RefreshCityList" name="REFRESH_CITY" class="btn btn-default">
                                                            <i class="fa fa-refresh"></i>
                                                        </button>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="col-lg-8 col-md-8 col-sm-8 col-xs-12">
                                            <div class="form-group">
                                                <label>Area</label>
                                                <input type="text" id="Area" class="form-control input-sm" />
                                            </div>
                                        </div>

                                        <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                            <div class="form-group">
                                                <label>Pin Code</label>
                                                <input type="text" id="PinCode" class="form-control input-sm" />
                                            </div>
                                        </div>

                                    </div>

                                    <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                                        
                                        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                            <div class="form-group">
                                                <label>Contact No.'s</label>
                                                <input type="text" id="ContactNos" class="form-control input-sm" />
                                            </div>
                                        </div>

                                        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                            <div class="form-group">
                                                <label>Email Id</label>
                                                <input type="text" id="EmailId" class="form-control input-sm" />
                                            </div>
                                        </div>

                                        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                            <div class="form-group">
                                                <label>Website</label>
                                                <input type="text" id="Website" class="form-control input-sm" />
                                            </div>
                                        </div>

                                        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                            <div class="form-group">
                                                <label>GST No.</label>
                                                <input type="text" id="GSTNo" class="form-control input-sm" />
                                            </div>
                                        </div>

                                    </div>

                                    <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                                        
                                        <div class="col-lg-10 col-md-10 col-sm-10 col-xs-12">
                                            <div class="form-group form-group-sm">
                                                <label>Transporter</label>
                                                <select id="Transporter" class="form-control input-sm"></select>
                                            </div>
                                        </div>

                                        
                                        <div class="col-lg-2 col-md-2 col-sm-2 col-xs-12">
                                            <div class="form-group form-group-sm">
                                                <label></label>
                                                <button type="button" id="AddTransporter" class="btn btn-sm btn-info">Add</button>
                                            </div>
                                        </div>

                                          <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                            <div class="form-group form-group-sm">                                      
                                                <div id="TransportersListContainer">
                                                    <ul id="TransportersList" class="list-group"></ul>
                                                    </div>
                                                </div>
                                              </div>

                                    </div>

                                </div>

                        
                        </div>

                    </div>

                    <!-- END OF CLIENT ADDRESS DETAILS -->

                </div>

            </div>

                <!-- MODAL OPEN -->

                <div id="CityModal" class="modal fade">

                <div class="modal-dialog modal-medium">

                    <div class="modal-content">

                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                            <h4 class="modal-title">City Details</h4>
                        </div>

                        <div class="modal-body modal-body-scroll">

                            <div class="row">

                                <div class="panel-body">

                                    <iframe id="CityDetails"></iframe>

                                </div>

                            </div>

                        </div>

                        <div class="modal-footer">
                            <button type="button" id="CloseCityModalWindow" class="btn btn-default btn-sm btn-rounded" data-dismiss="modal">Close</button>
                        </div>

                    </div>

                </div>

            </div>

                <!-- MODAL CLOSE -->

            </div>

            <!-- VIEW MODE -->

            <div id="ViewMode">

                <div class="panel panel-info">

                    <div class="panel-heading">

                        <div class="row">

                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">

                                <h4 class="panel-title panel-title-align-middle">Client Details</h4>

                            </div>

                        </div>

                    </div>

                    <div class="panel-body">

                        <div class="row">

                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">

                                <div class="table-responsive">
                                    <table id="ClientList" class="table table-condesed">
                                        <thead>
                                            <tr>
                                                <th class="text-center">Action</th>
                                                <th>Sr</th>
                                                <th>Client Type</th>
                                                <th>Client Code</th>
                                                <th>Client Name</th>                                                
                                            </tr>
                                        </thead>
                                        <tbody>
                                        </tbody>
                                    </table>

                                </div>

                            </div>

                        </div>

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

                </div>client.js

            </div>

            <!-- VIEW PANEL -->

        </div>

    </div>
    <!-- CONTAINER END -->


    <script type="text/javascript" src="../content/scripts/app/shared/default.js"></script>
    <script type="text/javascript" src="../content/scripts/app/Masters/client.js"></script>

</asp:Content>
