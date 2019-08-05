<%@ Page Title="Pre Employment Details" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="PreEmploymentDetails.aspx.cs" Inherits="HealthScreeningApp.Transactions.PreEmploymentDetails" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="cpMaster" runat="server">

    <div class="action-toolbar">

        <a href="#" id="AddNewPreEmploymentDetails"><i class="fa fa-plus fa-fw"></i>New</a>
        <a href="#" id="ShowPreEmploymentDetails"><i class="fa fa-list fa-fw"></i>List</a>
        <a href="#" id="ViewPreEmploymentDetails"><i class="fa fa-eye fa-fw"></i>View</a>
        <a href="#" id="EditPreEmploymentDetails"><i class="fa fa-edit fa-fw"></i>Edit</a>
        <a href="#" id="SavePreEmploymentDetails"><i class="fa fa-save fa-fw"></i>Save</a>
        <a href="#" id="DeletePreEmploymentDetails"><i class="fa fa-remove fa-fw"></i>Delete</a>
        <a href="#" id="PrintPreEmploymentDetails"><i class="fa fa-print fa-fw"></i>Print</a>
        <a href="#" id="FilterPreEmploymentDetails"><i class="fa fa-filter fa-fw"></i>Filter</a>
        <a href="#" id="ExportEmpoyeeList"><i class="fa fa-cog fa-fw"></i>Export</a>

    </div>

    <div class="st-content">

        <div class="container-fluid">

            <div class="page-header">
                <h3>PreEmployment Details</h3>
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


            <!-- view mode -->
            <div id="ViewMode">

                <div class="row">

                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">

                        <!-- Filter Options -->

                        <div class="panel panel-default hide" id="SearchPreEmploymentDetailsPanel">

                            <div class="panel-heading">

                                <div class="row">

                                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">

                                        <h4 class="panel-title panel-title-align-middle">Search Pre-Employment Details</h4>

                                    </div>

                                </div>

                            </div>

                            <div class="panel-body">

                                <div class="row">

                                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                        <div id="SearchCriteriaList" class="table-responsive" style="max-height: 300px;">
                                            <table id="SearchFieldsList" class="table table-condensed">
                                                <thead>
                                                    <tr>
                                                        <th class="col-lg-2 col-md-2 col-sm-4 col-xs-12">Field Name</th>
                                                        <th class="col-lg-2 col-md-2 col-sm-4 col-xs-12">Field Value</th>
                                                    </tr>
                                                </thead>
                                                <tbody></tbody>
                                            </table>
                                        </div>
                                    </div>

                                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">

                                        <div class="col-lg-3 col-md-4 col-sm-4 col-xs-12">
                                            <div class="form-group form-group-md">
                                                <button type="button" id="SearchPreEmploymentDetails" class="btn btn-info btn-md">Search</button>
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
                                <h4 class="panel-title">PreEmployment Details </h4>
                            </div>

                            <div class="panel-body">
                                <table id="PreEmploymentDetailsList" class="table table-condesed">
                                    <thead>
                                        <tr>
                                            <th class="text-center">Action</th>
                                            <th class="text-center">Company Name</th>
                                            <th class="text-center">Emp Code</th>
                                            <th class="text-center">Patient Name</th>
                                            <th class="text-center">Gender</th>
                                            <th class="text-center">Contact No.</th>
                                            <th class="text-center">Email Id</th>
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

            <!-- edit panel -->

            <div id="EditMode">

                <!-- MODAL OPEN -->

                <div id="SearchPatientModal" class="modal fade">

                        <div class="modal-dialog modal-medium">

                            <div class="modal-content">

                                <div class="modal-header">
                                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                                    <h4 class="modal-title">Search Patient</h4>
                                </div>

                                <div class="modal-body modal-body-scroll">

                                    <div class="row">

                                        <div class="panel-body">

                                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">

                                                <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                                                    <div class="form-group form-group-md">
                                                        <label>First Name</label>
                                                        <input type="text" id="FirstName" class="form-control" />
                                                    </div>
                                                </div>

                                                <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                                                    <div class="form-group form-group-md">
                                                        <label>Last Name</label>
                                                        <input type="text" id="LastName" class="form-control" />
                                                    </div>
                                                </div>

                                                <div class="form-group form-group-md">
                                                    <div class="col-lg-2 col-md-2 col-sm-3 col-xs-12">
                                                        <button type="button" id="SearchPatient" class="btn btn-md btn-success" style="margin-top: 26px;">Search</button>
                                                    </div>

                                                </div>

                                            </div>

                                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                <div class="table-responsive" style="max-height: 300px;">
                                                    <table id="PatientSearchList" class="table table-condensed">
                                                        <thead>
                                                            <tr>
                                                                <th>Action</th>
                                                                <th>Patient Code</th>
                                                                <th>Patient Name</th>
                                                                <th>Company Name</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody></tbody>
                                                    </table>
                                                </div>
                                            </div>

                                        </div>

                                    </div>

                                </div>

                                <div class="modal-footer">
                                    <button type="button" id="SelectPatient" class="btn btn-info btn-sm btn-rounded">Choose Select</button>
                                    <button type="button" id="CloseSearchPatientModal" class="btn btn-default btn-sm btn-rounded" data-dismiss="modal">Close</button>
                                </div>

                            </div>

                        </div>

                    </div>

                <!-- MODAL CLOSE -->

                <div class="row">

                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">

                        <div class="panel panel-info">

                            <div class="panel-heading">
                                <h3 class="panel-title">Patient Details</h3>
                            </div>

                            <div class="panel-body">

                                <!-- START OF MAIN NAV TABS -->

                                <ul class="nav nav-tabs" role="tablist">
                                    <li role="presentation" class="active"><a href="#PatientDetailsPanel" aria-controls="PatientDetailsPanel" role="tab" data-toggle="tab" tabindex="10">Patient Details</a></li>
                                    <li role="presentation"><a href="#GeneralTestDetails" aria-controls="GeneralTestDetails" role="tab" data-toggle="tab" tabindex="10">General Test Details</a></li>
                                    <li role="presentation"><a href="#InvestigationTestDetails" aria-controls="InvestigationTestDetails" role="tab" data-toggle="tab" tabindex="100">Investigation Test Details</a></li>
                                </ul>

                                <!-- START OF MAIN NAV TABS TAB CONTENT -->
                                <div class="tab-content">

                                    <!-- START OF Patient DETAILS TAB PANE -->

                                    <div role="tabpanel" class="tab-pane fade in active" id="PatientDetailsPanel">

                                        <div class="row">

                                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">

                                                <div class="col-lg-1 col-md-1 col-sm-2 col-xs-12">
                                                    <div class="form-group form-group-md">
                                                        <label>Fin. Year</label>
                                                        <select id="FinancialYear" class="form-control"></select>
                                                    </div>
                                                </div>

                                                <div class="col-lg-2 col-md-2 col-sm-4 col-xs-12">
                                                    <div class="form-group form-group-sm">
                                                        <label>Consult Date</label>
                                                        <div class="input-group date input-group-md" id="ConsultDateDatePicker">
                                                            <input type="text" id="ConsultDate" class="form-control" />
                                                            <span class="input-group-addon">
                                                                <i class="fa fa-calendar"></i>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                                                    <div class="form-group form-group-sm">
                                                        <label>Pre Employment Code No.</label>
                                                        <input type="text" id="PreEmploymentCodeNo" class="form-control" disabled="disabled" placeholder="Auto Generated" />
                                                    </div>
                                                </div>

                                            </div>

                                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">

                                                <div class="col-lg-1 col-md-1 col-sm-3 col-xs-12">
                                                    <div class="form-group form-group-sm">
                                                        <label>Emp Code</label>
                                                        <input type="text" id="PatientCode" class="form-control" />
                                                    </div>
                                                </div>

                                                <div class="col-lg-3 col-md-3 col-sm-4 col-xs-12">
                                                    <div class="form-group form-group-sm">
                                                        <label>Patient Name</label>
                                                        <div class="input-group">
                                                            <input type="text" id="PatientName" class="form-control" />
                                                            <div id="SearchPatientList" class="autocompleteList"></div>
                                                            <span class="input-group-btn">
                                                                <button type="button" id="SearchPatientName" class="btn btn-danger btn-md">
                                                                    <i class="fa fa-search"></i>
                                                                </button>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="col-lg-1 col-md-1 col-sm-2 col-xs-12">
                                                    <div class="form-group form-group-sm">
                                                        <label>Age</label>
                                                        <input type="text" id="Age" class="form-control" readonly="readonly" />
                                                    </div>
                                                </div>

                                                <div class="col-lg-1 col-md-1 col-sm-3 col-xs-12">
                                                    <div class="form-group form-group-sm">
                                                        <label>Gender</label>
                                                        <input type="text" id="Gender" class="form-control" disabled="disabled" />
                                                    </div>
                                                </div>

                                                <div class="col-lg-2 col-md-2 col-sm-3 col-xs-12">
                                                    <div class="form-group form-group-sm">
                                                        <label>Marital Status</label>
                                                        <input id="MaritalStatus" class="form-control" />
                                                    </div>
                                                </div>

                                                <div class="col-lg-2 col-md-2 col-sm-3 col-xs-12">
                                                    <div class="form-group form-group-sm">
                                                        <label>No. of Sons</label>
                                                        <input type="text" id="NoOfSons" class="form-control" />
                                                    </div>
                                                </div>

                                                <div class="col-lg-2 col-md-2 col-sm-3 col-xs-12">
                                                    <div class="form-group form-group-sm">
                                                        <label>No. of Daughters</label>
                                                        <input type="text" id="NoOfDaughters" class="form-control" />
                                                    </div>
                                                </div>

                                            </div>

                                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">

                                                <div class="col-lg-2 col-md-2 col-sm-3 col-xs-12">
                                                    <div class="form-group form-group-sm">
                                                        <label>Company Code</label>
                                                        <input type="text" id="EmployerCode" class="form-control" />
                                                    </div>
                                                </div>

                                                <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                                                    <div class="form-group form-group-sm">
                                                        <label>Company Name</label>
                                                        <input type="text" id="EmployerName" class="form-control" />
                                                    </div>
                                                </div>

                                                <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                                                    <div class="form-group form-group-sm">
                                                        <label>Designation</label>
                                                        <input id="Designation" class="form-control" />
                                                    </div>
                                                </div>

                                                <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                                                    <div class="form-group form-group-sm">
                                                        <label>Identification Mark</label>
                                                        <input id="IdentificationMark" class="form-control" />
                                                    </div>
                                                </div>

                                            </div>

                                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">

                                                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                    <div class="form-group form-group-sm">
                                                        <label>Personal History of major illness</label>
                                                        <input type="text" id="PersonalHistoryOfMajorIllness" class="form-control" />
                                                    </div>
                                                </div>

                                            </div>

                                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                <div class="col-lg-2 col-md-2 col-sm-2 col-xs-12">
                                                    <div class="form-group form-group-sm">
                                                        <label>Drug Allergy</label>
                                                        <input type="text" id="DrugAllergy" class="form-control" />
                                                    </div>
                                                </div>

                                                <div class="col-lg-2 col-md-2 col-sm-2 col-xs-12">
                                                    <div class="form-group form-group-sm">
                                                        <label>Micturation</label>
                                                        <input type="text" id="Micturation" class="form-control" />
                                                    </div>
                                                </div>

                                                <div class="col-lg-2 col-md-2 col-sm-2 col-xs-12">
                                                    <div class="form-group form-group-sm">
                                                        <label>Bowels</label>
                                                        <input type="text" id="Bowels" class="form-control" />
                                                    </div>
                                                </div>

                                                <div class="col-lg-2 col-md-2 col-sm-2 col-xs-12">
                                                    <div class="form-group form-group-sm">
                                                        <label>Sleep</label>
                                                        <input type="text" id="Sleep" class="form-control" />
                                                    </div>
                                                </div>

                                                <div class="col-lg-2 col-md-2 col-sm-2 col-xs-12">
                                                    <div class="form-group form-group-sm">
                                                        <label>Alcohol</label>
                                                        <input type="text" id="Alcohol" class="form-control" />
                                                    </div>
                                                </div>

                                                <div class="col-lg-1 col-md-1 col-sm-2 col-xs-12">
                                                    <div class="form-group form-group-sm">
                                                        <label>Smoking</label>
                                                        <input type="text" id="Smoking" class="form-control" />
                                                    </div>
                                                </div>

                                                <div class="col-lg-1 col-md-1 col-sm-2 col-xs-12">
                                                    <div class="form-group form-group-sm">
                                                        <label>M.C.</label>
                                                        <input type="text" id="MC" class="form-control" />
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                <div class="col-lg-12 col-md-12 col-sm-2 col-xs-12">
                                                    <div class="form-group form-group-sm">
                                                        <label>Family History of any major illness</label>
                                                        <input type="text" id="FamilyHistoryOfMajorIllness" class="form-control" />
                                                    </div>
                                                </div>
                                            </div>


                                        </div>

                                    </div>

                                    <!-- END OF GENERAL DETAILS TAB PANE -->

                                    <!-- START OF GENERAL TEST DETAILS TAB PANE -->

                                    <div role="tabpanel" class="tab-pane fade in" id="GeneralTestDetails">

                                        <div class="panel-body">

                                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">

                                                <div class="col-lg-2 col-md-2 col-sm-2 col-xs-12">
                                                    <div class="form-group form-group-sm">
                                                        <label>Height (Cms)</label>
                                                        <input type="text" id="Height" class="form-control" />
                                                    </div>
                                                </div>

                                                <div class="col-lg-2 col-md-2 col-sm-2 col-xs-12">
                                                    <div class="form-group form-group-sm">
                                                        <label>Weight (Kgs)</label>
                                                        <input type="text" id="Weight" class="form-control" />
                                                    </div>
                                                </div>

                                            </div>

                                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">

                                                <div class="table-responsive">

                                                    <table id="GeneralTestList" class="table table-condesed">
                                                        <thead>
                                                            <tr>
                                                                <th class="text-center">Test Name</th>
                                                                <th class="text-center">Test Result</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                        </tbody>
                                                    </table>
                                                </div>

                                            </div>


                                        </div>

                                    </div>

                                    <!-- END OF GENERAL TEST DETAILS TAB PANE  -->

                                    <!-- START OF INVESTIGATION TEST TAB PANE -->

                                    <div role="tabpanel" class="tab-pane fade in" id="InvestigationTestDetails">

                                        <div class="panel-body">

                                            <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">

                                                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">

                                                    <div class="table-responsive">

                                                        <table id="InvestigationTestList" class="table table-condesed">
                                                            <thead>
                                                                <tr>
                                                                    <th class="text-center">Test Name</th>
                                                                    <th class="text-center">Test Result</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                            </tbody>
                                                        </table>

                                                    </div>

                                                </div>

                                            </div>

                                            <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">

                                                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">

                                                        <div class="col-lg-12 col-md-12 col-sm-2 col-xs-12">
                                                            <div class="form-group form-group-md">
                                                                <label>Other Details</label>
                                                                <textarea class="form-control" id="OtherDetails" rows="5"></textarea>
                                                            </div>
                                                        </div>

                                                        <div class="col-lg-12 col-md-12 col-sm-2 col-xs-12">
                                                            <div class="form-group form-group-md">
                                                                <label>Remarks</label>
                                                                <textarea class="form-control" id="Remarks" rows="5"></textarea>
                                                            </div>
                                                        </div>

                                                        <div class="col-lg-12 col-md-12 col-sm-2 col-xs-12">
                                                            <div class="form-group form-group-md">
                                                                <label>Medically Fit</label>
                                                                <textarea class="form-control" id="MedicallyFit" rows="5"></textarea>
                                                            </div>
                                                        </div>

                                                    </div>
                                            </div>

                                        </div>

                                    </div>

                                    <!-- END OF INVESTIGATION TEST DETAILS TAB PANE -->

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    </div>

    <script type="text/javascript" src="../content/scripts/app/shared/default.js"></script>
    <script type="text/javascript" src="../content/scripts/app/Transactions/preemployment-details.js"></script>
</asp:Content>
