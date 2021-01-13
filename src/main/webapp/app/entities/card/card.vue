<template>
    <div>
        <h2 id="page-heading">
            <span id='card-heading'>Cards</span>
            <router-link :to="{name: 'CardCreate'}" tag="button" id="jh-create-entity" class="btn btn-primary float-right jh-create-entity create-card">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span>
                    Create a new Card
                </span>
            </router-link>
        </h2>
        <b-alert :show="dismissCountDown"
            dismissible
            :variant="alertType"
            @dismissed="dismissCountDown=0"
            @dismiss-count-down="countDownChanged">
            {{alertMessage}}
        </b-alert>
        <br/>
        <div class="alert alert-warning" v-if="!isFetching && cards && cards.length === 0">
            <span>No cards found</span>
        </div>
        <div class="table-responsive" v-if="cards && cards.length > 0">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th v-on:click="changeOrder('id')"><span>ID</span>
                        <jhi-sort-indicator :current-order='propOrder' :field-name="'id'"
                                            :reverse='reverse'></jhi-sort-indicator>
                    </th>
                    <th v-on:click="changeOrder('cardNo')"><span>Card No</span>
                        <jhi-sort-indicator :current-order='propOrder' :field-name="'cardNo'"
                                            :reverse='reverse'></jhi-sort-indicator>
                    </th>
                    <th v-on:click="changeOrder('expiryDate')"><span>Expiry Date</span>
                        <jhi-sort-indicator :current-order='propOrder' :field-name="'expiryDate'"
                                            :reverse='reverse'></jhi-sort-indicator>
                    </th>
                    <th v-on:click="changeOrder('isActive')"><span>Is Active</span>
                        <jhi-sort-indicator :current-order='propOrder' :field-name="'isActive'"
                                            :reverse='reverse'></jhi-sort-indicator>
                    </th>
                    <th v-on:click="changeOrder('employee.name')"><span>Employee</span>
                        <jhi-sort-indicator :current-order='propOrder' :field-name="'employee.name'"
                                            :reverse='reverse'></jhi-sort-indicator>
                    </th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="card in cards"
                    :key="card.id">
                    <td>
                        <router-link :to="{name: 'CardView', params: {cardId: card.id}}">{{card.id}}</router-link>
                    </td>
                    <td>{{card.cardNo}}</td>
                    <td>{{card.expiryDate}}</td>
                    <td>{{card.isActive}}</td>
                    <td>
                        <div v-if='card.employee'>
                            <router-link :to="{name: 'EmployeeView', params: {employeeId: card.employee.id}}">
                                {{ card.employee.name }}
                            </router-link>
                        </div>
                    </td>
                    <td class="text-right">
                        <div class="btn-group">
                            <router-link :to="{name: 'CardView', params: {cardId: card.id}}" tag="button" class="btn btn-info btn-sm details">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class='d-none d-md-inline'>View</span>
                            </router-link>
                            <router-link :to="{name: 'CardEdit', params: {cardId: card.id}}"  tag="button" class="btn btn-primary btn-sm edit">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class='d-none d-md-inline'>Edit</span>
                            </router-link>
                            <b-button v-on:click="prepareRemove(card)"
                                   variant="danger"
                                   class="btn btn-sm"
                                   v-b-modal.removeEntity>
                                <font-awesome-icon icon="times"></font-awesome-icon>
                                <span class='d-none d-md-inline'>Delete</span>
                            </b-button>
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        <b-modal ref="removeEntity" id="removeEntity" >
            <span slot='modal-title'><span id='sahatiApp.card.delete.question'>Confirm delete operation</span></span>
            <div class="modal-body">
                <p id='jhi-delete-card-heading'>Are you sure you want to delete this Card?</p>
            </div>
            <div slot='modal-footer'>
                <button class='btn btn-secondary' type='button' v-on:click='closeDialog()'>Cancel</button>
                <button id='jhi-confirm-delete-card' class='btn btn-primary' type='button' v-on:click='removeCard()'>
                    Delete
                </button>
            </div>
        </b-modal>
        <div v-show="cards && cards.length > 0">
            <div class="row justify-content-center">
                <jhi-item-count :page="page" :total="queryCount" :itemsPerPage="itemsPerPage"></jhi-item-count>
            </div>
            <div class="row justify-content-center">
                <b-pagination size="md" :total-rows="totalItems" v-model="page" :per-page="itemsPerPage" :change="loadPage(page)"></b-pagination>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./card.component.ts">
</script>
