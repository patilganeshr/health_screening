<%@ Page Title="Employee" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Employee.aspx.cs" Inherits="HealthScreeningApp.Masters.Employee" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="cpMaster" runat="server">

    <div class="action-toolbar">

        <a href="#" id="AddNewEmployee"><i class="fa fa-plus fa-fw"></i>New</a>
        <a href="#" id="ShowEmployeeList"><i class="fa fa-list fa-fw"></i>List</a>
        <a href="#" id="ViewEmployee"><i class="fa fa-eye fa-fw"></i>View</a>
        <a href="#" id="EditEmployee"><i class="fa fa-edit fa-fw"></i>Edit</a>
        <a href="#" id="SaveEmployee"><i class="fa fa-save fa-fw"></i>Save</a>
        <a href="#" id="DeleteEmployee"><i class="fa fa-remove fa-fw"></i>Delete</a>
        <a href="#" id="PrintEmployeeList"><i class="fa fa-print fa-fw"></i>Print</a>
        <a href="#" id="FilterEmployee"><i class="fa fa-filter fa-fw"></i>Filter</a>
        <a href="#" id="ExportEmpoyeeList"><i class="fa fa-cog fa-fw"></i>Export</a>

    </div>

    <div class="st-content">

        <div class="container-fluid">

            <div class="page-header">
                <h3>Employee</h3>
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

                        <div class="panel panel-info">

                            <div class="panel-heading">
                                <h4 class="panel-title">List of Employees</h4>
                            </div>

                            <div class="panel-body">
                                <table id="EmployeesList" class="table table-condesed">
                                    <thead>
                                        <tr>
                                            <th class="text-center">Action</th>
                                            <th>Sr</th>
                                            <th>Employee Name</th>
                                            <th>Gender</th>
                                            <th>Contact No.</th>
                                            <th>Email Id</th>
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

                <div class="row">

                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">

                        <div class="panel panel-info">

                            <div class="panel-heading">
                                <h3 class="panel-title">Employee Details</h3>
                            </div>

                            <div class="panel-body">

                                <!-- START OF MAIN NAV TABS -->

                                <ul class="nav nav-tabs" role="tablist">
                                    <li role="presentation" class="active"><a href="#GeneralDetails" aria-controls="GeneralDetails" role="tab" data-toggle="tab" tabindex="10">General Details</a></li>
                                    <li role="presentation"><a href="#PersonalHistory" aria-controls="PersonalHistory" role="tab" data-toggle="tab" tabindex="10">Personal History</a></li>
                                    <li role="presentation"><a href="#PastAndPresentIllness" aria-controls="PastAndPresentIllness" role="tab" data-toggle="tab" tabindex="100">Past and Present Illness</a></li>
                                    <li role="presentation"><a href="#FamilyHistory" aria-controls="FamilyHistory" role="tab" data-toggle="tab" tabindex="300">Family History</a></li>
                                </ul>

                                <!-- START OF MAIN NAV TABS TAB CONTENT -->
                                <div class="tab-content">

                                    <!-- START OF GENERAL DETAILS TAB PANE -->

                                    <div role="tabpanel" class="tab-pane fade in active" id="GeneralDetails">
    
                                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">

                                                <div class="col-lg-3 col-md-3 col-sm-4 col-xs-12">
                                                    <div class="form-group form-group-sm">
                                                        <label>Employee Code</label>
                                                        <input type="text" id="EmployeeCode" class="form-control" />
                                                    </div>
                                                </div>

                                                <div class="col-lg-3 col-md-3 col-sm-4 col-xs-12">
                                                    <div class="form-group form-group-sm">
                                                        <label>First Name</label>
                                                        <input type="text" id="FirstName" class="form-control" />
                                                    </div>
                                                </div>

                                                <div class="col-lg-3 col-md-3 col-sm-4 col-xs-12">
                                                    <div class="form-group form-group-sm">
                                                        <label>Middle Name</label>
                                                        <input type="text" id="MiddleName" class="form-control" />
                                                    </div>
                                                </div>

                                                <div class="col-lg-3 col-md-3 col-sm-4 col-xs-12">
                                                    <div class="form-group form-group-sm">
                                                        <label>Last Name</label>
                                                        <input type="text" id="LastName" class="form-control" />
                                                    </div>
                                                </div>

                                            </div>

                                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">

                                                <div class="col-lg-3 col-md-3 col-sm-4 col-xs-12">
                                                    <div class="form-group form-group-sm">
                                                        <label>Address</label>
                                                        <textarea id="Address" class="form-control" rows="1"></textarea>
                                                    </div>
                                                </div>

                                                <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                                                    <div class="form-group form-group-sm">
                                                        <label>Date Of Birth</label>
                                                        <div class="input-group date input-group-md" id="DateOfBirthDatePicker">
                                                            <input type="text" id="DateOfBirth" class="form-control" />
                                                            <span class="input-group-addon">
                                                                <i class="fa fa-calendar"></i>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                                                    <label for="Gender">Gender</label>
                                                    <div class="form-group form-group-sm">
                                                        <label class="lable-tick">
                                                            <input type="radio" id="Male" class="label-radio" name="Gender" value="Male" />
                                                            <span class="label-text">Male</span>
                                                        </label>
                                                        <label class="lable-tick">
                                                            <input type="radio" id="Female" class="label-radio" name="Gender" checked="checked" value="Female" />
                                                            <span class="label-text">Female</span>
                                                        </label>
                                                    </div>
                                                </div>


                                                <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                                                    <div class="form-group form-group-sm">
                                                        <label>Email Id</label>
                                                        <input type="text" id="EmailId" class="form-control" />
                                                    </div>
                                                </div>

                                            </div>

                                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                                                    <div class="form-group form-group-sm">
                                                        <label>Contact No. 1</label>
                                                        <input type="text" id="ContactNo1" class="form-control" />
                                                    </div>
                                                </div>

                                                <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                                                    <div class="form-group form-group-sm">
                                                        <label>Contact No. 2</label>
                                                        <input type="text" id="ContactNo2" class="form-control" />
                                                    </div>
                                                </div>

                                                <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                                                    <div class="form-group form-group-sm">
                                                        <label>Mobile No. 1</label>
                                                        <input type="text" id="MobileNo1" class="form-control" />
                                                    </div>
                                                </div>

                                                <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                                                    <div class="form-group form-group-sm">
                                                        <label>Mobile No. 2</label>
                                                        <input type="text" id="MobileNo2" class="form-control" />
                                                    </div>
                                                </div>

                                            </div>

                                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">

                                                <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                                                    <div class="form-group form-group-sm">
                                                        <label>PAN No.</label>
                                                        <input type="text" id="PANNo" class="form-control" />
                                                    </div>
                                                </div>

                                                <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                                                    <div class="form-group form-group-sm">
                                                        <label>Branch Name</label>
                                                        <select id="Branch" class="form-control"></select>
                                                    </div>
                                                </div>

                                                <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                                                    <div class="form-group form-group-sm">
                                                        <label>Department</label>
                                                        <input id="Department" class="form-control" />
                                                    </div>
                                                </div>

                                                <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                                                    <div class="form-group form-group-sm">
                                                        <label>Designation</label>
                                                        <input id="Designation" class="form-control" />
                                                    </div>
                                                </div>

                                            </div>



                                        

                                    </div>

                                    <!-- END OF GENERAL DETAILS TAB PANE -->


                                    <!-- START OF PERSONAL DETAILS TAB PANE -->

                                    <div role="tabpanel" class="tab-pane fade in" id="PersonalHistory">

                                        <div class="panel-body">

                                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">

                                                <div class="col-lg-3 col-md-3 col-sm-4 col-xs-12">
                                                    <label for="MaritalStatus">Marital Status</label>
                                                    <div class="form-group form-group-sm">
                                                        <label class="lable-tick">
                                                            <input type="radio" id="Married" class="label-radio" name="MaritalStatus" value="Married" />
                                                            <span class="label-text">Married</span>
                                                        </label>
                                                        <label class="lable-tick">
                                                            <input type="radio" id="UnMarried" class="label-radio" name="MartialStatus" checked="checked" value="UnMarried" />
                                                            <span class="label-text">UnMarried</span>
                                                        </label>
                                                    </div>
                                                </div>

                                                <div class="col-lg-1 col-md-1 col-sm-2 col-xs-12">
                                                    <div class="form-group form-group-sm">
                                                        <label>No. of Sons</label>
                                                        <input type="text" id="NoOfSons" class="form-control" />
                                                    </div>
                                                </div>

                                                <div class="col-lg-1 col-md-1 col-sm-2 col-xs-12">
                                                    <div class="form-group form-group-sm">
                                                        <label>No. of Daughters</label>
                                                        <input type="text" id="NoOfDaugthers" class="form-control" />
                                                    </div>
                                                </div>

                                                <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                                                    <label>FP Operation on self</label>
                                                    <div class="form-group form-group-sm">
                                                        <label class="lable-tick">
                                                            <input type="radio" id="FPOperationOnSelfYes" class="label-radio" name="FPOperationOnSelf" value="Yes" />
                                                            <span class="label-text">Yes</span>
                                                        </label>
                                                        <label class="lable-tick">
                                                            <input type="radio" id="FPOperationOnSelfNo" class="label-radio" name="FPOperationOnSelf" checked="checked" value="No" />
                                                            <span class="label-text">No</span>
                                                        </label>
                                                    </div>
                                                </div>

                                                <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                                                    <label>FP Operation on Spouse</label>
                                                    <div class="form-group form-group-sm">
                                                        <label class="lable-tick">
                                                            <input type="radio" id="FPOperationOnSpouseYes" class="label-radio" name="FPOperationOnSpouse" value="Yes" />
                                                            <span class="label-text">Yes</span>
                                                        </label>
                                                        <label class="lable-tick">
                                                            <input type="radio" id="FPOperationOnSpouseNo" class="label-radio" name="FPOperationOnSpouse" checked="checked" value="No" />
                                                            <span class="label-text">No</span>
                                                        </label>
                                                    </div>
                                                </div>

                                            </div>

                                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">

                                                <div class="col-lg-2 col-md-2 col-sm-3 col-xs-12">
                                                    <label>Smoking</label>
                                                    <div class="form-group form-group-sm">
                                                        <label class="lable-tick">
                                                            <input type="radio" id="SmokingYes" class="label-radio" name="Smoking" value="Yes" />
                                                            <span class="label-text">Yes</span>
                                                        </label>
                                                        <label class="lable-tick">
                                                            <input type="radio" id="SmokingNo" class="label-radio" name="Smoking" checked="checked" value="No" />
                                                            <span class="label-text">No</span>
                                                        </label>
                                                    </div>
                                                </div>

                                                <div class="col-lg-2 col-md-2 col-sm-3 col-xs-12">
                                                    <label>Alcohol</label>
                                                    <div class="form-group form-group-sm">
                                                        <label class="lable-tick">
                                                            <input type="radio" id="AlcoholYes" class="label-radio" name="AlcoholYes" value="Yes" />
                                                            <span class="label-text">Yes</span>
                                                        </label>
                                                        <label class="lable-tick">
                                                            <input type="radio" id="AlcoholNo" class="label-radio" name="AlcoholNo" checked="checked" value="No" />
                                                            <span class="label-text">No</span>
                                                        </label>
                                                    </div>
                                                </div>

                                                <div class="col-lg-2 col-md-2 col-sm-3 col-xs-12">
                                                    <label>Tobacco</label>
                                                    <div class="form-group form-group-sm">
                                                        <label class="lable-tick">
                                                            <input type="radio" id="TobaccoYes" class="label-radio" name="Tobacco" value="Yes" />
                                                            <span class="label-text">Yes</span>
                                                        </label>
                                                        <label class="lable-tick">
                                                            <input type="radio" id="TobaccoNo" class="label-radio" name="Tobacco" checked="checked" value="No" />
                                                            <span class="label-text">No</span>
                                                        </label>
                                                    </div>
                                                </div>

                                                <div class="col-lg-2 col-md-2 col-sm-3 col-xs-12">
                                                    <label>Using Contact Lens</label>
                                                    <div class="form-group form-group-sm">
                                                        <label class="lable-tick">
                                                            <input type="radio" id="ContactLensYes" class="label-radio" name="ContactLens" value="Yes" />
                                                            <span class="label-text">Yes</span>
                                                        </label>
                                                        <label class="lable-tick">
                                                            <input type="radio" id="ContactLensNo" class="label-radio" name="ContactLens" checked="checked" value="No" />
                                                            <span class="label-text">No</span>
                                                        </label>
                                                    </div>
                                                </div>

                                                <div class="col-lg-2 col-md-2 col-sm-3 col-xs-12">
                                                    <label>Laser Surgery On Eyes</label>
                                                    <div class="form-group form-group-sm">
                                                        <label class="lable-tick">
                                                            <input type="radio" id="LaserSurgeryYes" class="label-radio" name="LaserSurgery" value="Yes" />
                                                            <span class="label-text">Yes</span>
                                                        </label>
                                                        <label class="lable-tick">
                                                            <input type="radio" id="LaserSurgeryNo" class="label-radio" name="LaserSurgery" checked="checked" value="No" />
                                                            <span class="label-text">No</span>
                                                        </label>
                                                    </div>
                                                </div>


                                            </div>

                                        </div>

                                    </div>

                                    <!-- END OF PERSONAL DETAILS TAB PANE  -->

                                    <!-- START OF PAST AND PRESENT ILLNESS TAB PANE -->

                                    <div role="tabpanel" class="tab-pane fade in" id="PastAndPresentIllness">

                                        <div class="panel-body">

                                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">

                                                <div class="col-lg-2 col-md-2 col-sm-3 col-xs-12">
                                                    <label for="Asthama">Asthama</label>
                                                    <div class="form-group form-group-sm">
                                                        <label class="lable-tick">
                                                            <input type="radio" id="AsthamaYes" class="label-radio" name="Asthama" value="Yes" />
                                                            <span class="label-text">Yes</span>
                                                        </label>
                                                        <label class="lable-tick">
                                                            <input type="radio" id="AsthamaNo" class="label-radio" name="Asthama" checked="checked" value="No" />
                                                            <span class="label-text">No</span>
                                                        </label>
                                                    </div>
                                                </div>

                                                <div class="col-lg-2 col-md-2 col-sm-3 col-xs-12">
                                                    <label for="Polio">Polio</label>
                                                    <div class="form-group form-group-sm">
                                                        <label class="lable-tick">
                                                            <input type="radio" id="PolioYes" class="label-radio" name="Polio" value="Yes" />
                                                            <span class="label-text">Yes</span>
                                                        </label>
                                                        <label class="lable-tick">
                                                            <input type="radio" id="PolioNo" class="label-radio" name="Polio" checked="checked" value="No" />
                                                            <span class="label-text">No</span>
                                                        </label>
                                                    </div>
                                                </div>

                                                <div class="col-lg-2 col-md-2 col-sm-3 col-xs-12">
                                                    <label for="EarDisease">Ear Disease</label>
                                                    <div class="form-group form-group-sm">
                                                        <label class="lable-tick">
                                                            <input type="radio" id="EarDiseaseYes" class="label-radio" name="EarDisease" value="Yes" />
                                                            <span class="label-text">Yes</span>
                                                        </label>
                                                        <label class="lable-tick">
                                                            <input type="radio" id="EarDiseaseNo" class="label-radio" name="EarDisease" checked="checked" value="No" />
                                                            <span class="label-text">No</span>
                                                        </label>
                                                    </div>
                                                </div>

                                                <div class="col-lg-2 col-md-2 col-sm-3 col-xs-12">
                                                    <label for="VenerealDisease">Venereal Disease</label>
                                                    <div class="form-group form-group-sm">
                                                        <label class="lable-tick">
                                                            <input type="radio" id="VenerealDiseaseYes" class="label-radio" name="VenereaDisease" value="Yes" />
                                                            <span class="label-text">Yes</span>
                                                        </label>
                                                        <label class="lable-tick">
                                                            <input type="radio" id="VenerealDiseaseNo" class="label-radio" name="VenereaDisease" checked="checked" value="No" />
                                                            <span class="label-text">No</span>
                                                        </label>
                                                    </div>
                                                </div>

                                                <div class="col-lg-2 col-md-2 col-sm-3 col-xs-12">
                                                    <label for="HeartDisease">Heart Disease</label>
                                                    <div class="form-group form-group-sm">
                                                        <label class="lable-tick">
                                                            <input type="radio" id="HeartDiseaseYes" class="label-radio" name="HeartDisease" value="Yes" />
                                                            <span class="label-text">Yes</span>
                                                        </label>
                                                        <label class="lable-tick">
                                                            <input type="radio" id="HeartDiseaseNo" class="label-radio" name="HeartDisease" checked="checked" value="No" />
                                                            <span class="label-text">No</span>
                                                        </label>
                                                    </div>
                                                </div>

                                                <div class="col-lg-2 col-md-2 col-sm-3 col-xs-12">
                                                    <label for="SurgeryUndergone">Surgery Undergone</label>
                                                    <div class="form-group form-group-sm">
                                                        <label class="lable-tick">
                                                            <input type="radio" id="SurgeryUndergoneYes" class="label-radio" name="SurgeryUndergone" value="Yes" />
                                                            <span class="label-text">Yes</span>
                                                        </label>
                                                        <label class="lable-tick">
                                                            <input type="radio" id="SurgeryUndergoneNo" class="label-radio" name="SurgeryUndergone" checked="checked" value="No" />
                                                            <span class="label-text">No</span>
                                                        </label>
                                                    </div>
                                                </div>

                                                <div class="col-lg-2 col-md-2 col-sm-3 col-xs-12">
                                                    <label for="KidneyDisease">Kidney Disease</label>
                                                    <div class="form-group form-group-sm">
                                                        <label class="lable-tick">
                                                            <input type="radio" id="KidneyDiseaseYes" class="label-radio" name="KidneyDisease" value="Yes" />
                                                            <span class="label-text">Yes</span>
                                                        </label>
                                                        <label class="lable-tick">
                                                            <input type="radio" id="KidneyDiseaseNo" class="label-radio" name="KidneyDisease" checked="checked" value="No" />
                                                            <span class="label-text">No</span>
                                                        </label>
                                                    </div>
                                                </div>

                                                <div class="col-lg-2 col-md-2 col-sm-3 col-xs-12">
                                                    <label for="Diabetes">Diabetes</label>
                                                    <div class="form-group form-group-sm">
                                                        <label class="lable-tick">
                                                            <input type="radio" id="DiabetesYes" class="label-radio" name="Diabetes" value="Yes" />
                                                            <span class="label-text">Yes</span>
                                                        </label>
                                                        <label class="lable-tick">
                                                            <input type="radio" id="DiabetesNo" class="label-radio" name="Diabetes" checked="checked" value="No" />
                                                            <span class="label-text">No</span>
                                                        </label>
                                                    </div>
                                                </div>

                                                <div class="col-lg-2 col-md-2 col-sm-3 col-xs-12">
                                                    <label for="Leprosy">Leprosy</label>
                                                    <div class="form-group form-group-sm">
                                                        <label class="lable-tick">
                                                            <input type="radio" id="LeprosyYes" class="label-radio" name="Leprosy" value="Yes" />
                                                            <span class="label-text">Yes</span>
                                                        </label>
                                                        <label class="lable-tick">
                                                            <input type="radio" id="LeprosyNo" class="label-radio" name="Leprosy" checked="checked" value="No" />
                                                            <span class="label-text">No</span>
                                                        </label>
                                                    </div>
                                                </div>

                                            </div>

                                        </div>

                                    </div>

                                    <!-- END OF PAST AND PRESENT ILLNESS DETAILS TAB PANE -->

                                    <!-- START OF FAMILY HISTORY DETAILS TAB PANE -->

                                    <div role="tabpanel" class="tab-pane fade in active" id="FamilyHistory">

                                        <div class="panel-body">

                                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">

                                                <div class="col-lg-2 col-md-2 col-sm-4 col-xs-12">
                                                    <label for="FHAsthama">Asthama</label>
                                                    <div class="form-group form-group-sm">
                                                        <label class="lable-tick">
                                                            <input type="radio" id="FHAsthamaYes" class="label-radio" name="FHAsthama" value="Yes" />
                                                            <span class="label-text">Yes</span>
                                                        </label>
                                                        <label class="lable-tick">
                                                            <input type="radio" id="FHAsthamaNo" class="label-radio" name="FHAsthama" checked="checked" value="No" />
                                                            <span class="label-text">No</span>
                                                        </label>
                                                    </div>
                                                </div>

                                                <div class="col-lg-2 col-md-2 col-sm-4 col-xs-12">
                                                    <label for="FHHeartDisease">Heart Disease</label>
                                                    <div class="form-group form-group-sm">
                                                        <label class="lable-tick">
                                                            <input type="radio" id="FHHeartDiseaseYes" class="label-radio" name="FHHeartDisease" value="Yes" />
                                                            <span class="label-text">Yes</span>
                                                        </label>
                                                        <label class="lable-tick">
                                                            <input type="radio" id="FHHeartDiseaseNo" class="label-radio" name="FHHeartDisease" checked="checked" value="No" />
                                                            <span class="label-text">No</span>
                                                        </label>
                                                    </div>
                                                </div>

                                                <div class="col-lg-2 col-md-2 col-sm-4 col-xs-12">
                                                    <label for="FHHighBloodPressure">High Blood Pressure</label>
                                                    <div class="form-group form-group-sm">
                                                        <label class="lable-tick">
                                                            <input type="radio" id="FHHighBloodPressureYes" class="label-radio" name="FHHighBloodPressure" value="Yes" />
                                                            <span class="label-text">Yes</span>
                                                        </label>
                                                        <label class="lable-tick">
                                                            <input type="radio" id="FHHighBloodPressureNo" class="label-radio" name="FHHighBloodPressure" checked="checked" value="No" />
                                                            <span class="label-text">No</span>
                                                        </label>
                                                    </div>
                                                </div>

                                                <div class="col-lg-2 col-md-2 col-sm-4 col-xs-12">
                                                    <label for="FHTB">TB</label>
                                                    <div class="form-group form-group-sm">
                                                        <label class="lable-tick">
                                                            <input type="radio" id="FHTBYes" class="label-radio" name="FHTB" value="Yes" />
                                                            <span class="label-text">Yes</span>
                                                        </label>
                                                        <label class="lable-tick">
                                                            <input type="radio" id="FHTBNo" class="label-radio" name="FHTB" checked="checked" value="No" />
                                                            <span class="label-text">No</span>
                                                        </label>
                                                    </div>
                                                </div>

                                                <div class="col-lg-2 col-md-2 col-sm-4 col-xs-12">
                                                    <label for="FHDiabetes">Diabetes</label>
                                                    <div class="form-group form-group-sm">
                                                        <label class="lable-tick">
                                                            <input type="radio" id="FHDiabetesYes" class="label-radio" name="FHDiabetes" value="Yes" />
                                                            <span class="label-text">Yes</span>
                                                        </label>
                                                        <label class="lable-tick">
                                                            <input type="radio" id="FHDiabetesNo" class="label-radio" name="FHDiabetes" checked="checked" value="No" />
                                                            <span class="label-text">No</span>
                                                        </label>
                                                    </div>
                                                </div>

                                                <div class="col-lg-2 col-md-2 col-sm-4 col-xs-12">
                                                    <label for="FHCancer">Cancer</label>
                                                    <div class="form-group form-group-sm">
                                                        <label class="lable-tick">
                                                            <input type="radio" id="FHCancerYes" class="label-radio" name="FHCancer" value="Yes" />
                                                            <span class="label-text">Yes</span>
                                                        </label>
                                                        <label class="lable-tick">
                                                            <input type="radio" id="FHCancerNo" class="label-radio" name="FHCancer" checked="checked" value="No" />
                                                            <span class="label-text">No</span>
                                                        </label>
                                                    </div>
                                                </div>

                                                <div class="col-lg-2 col-md-2 col-sm-4 col-xs-12">
                                                    <label for="FHPsychiatricIllness">Psychiatric Illness</label>
                                                    <div class="form-group form-group-sm">
                                                        <label class="lable-tick">
                                                            <input type="radio" id="FHPsychiatricIllnessYes" class="label-radio" name="FHPsychiatricIllness" value="Yes" />
                                                            <span class="label-text">Yes</span>
                                                        </label>
                                                        <label class="lable-tick">
                                                            <input type="radio" id="FHPsychiatricIllnessNo" class="label-radio" name="FHPsychiatricIllness" checked="checked" value="No" />
                                                            <span class="label-text">No</span>
                                                        </label>
                                                    </div>
                                                </div>

                                                <div class="col-lg-3 col-md-3 col-sm-2 col-xs-12">
                                                    <div class="form-group form-group-sm">
                                                        <label>Any other diseases</label>
                                                        <input type="text" id="AnyOtherDiseases" class="form-control" />
                                                    </div>
                                                </div>

                                            </div>


                                        </div>

                                    </div>

                                    <!-- END OF FAMILY HISTORY DETAILS TAB PANE -->


                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    </div>

    <script type="text/javascript" src="../content/scripts/app/shared/default.js"></script>
    <script type="text/javascript" src="../content/scripts/app/Masters/employee.js"></script>

</asp:Content>
