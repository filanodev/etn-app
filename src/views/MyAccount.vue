<template>
    <div class="page-content" style="padding-top: 0!important;border-top-left-radius: 0px;">
        <Header ref="header" :pageTitle="$t('message.hello_user', {name: user?user.firstname:''})" :show_user_flag="true" :show_email="true" :show_profile_image="true"/>
        <div class="card" style="background-color: #fff">
            <div class="content" style="margin-top: 0px;">
                <!-- <div style="padding-top: 0px;">
                    <div style="width: 20%;display: inline-block;text-align: center;">
                        <i @click="open_language_select" class="fa fa-language font-22 color-piketplace" style="color: gray;"></i>
                    </div>
                    <div style="width: 60%;display: inline-block;text-align: center;">
                        <i @click="$router.push({name: 'profil'})" class="fa fa-edit color-piketplace tw:inline"></i>
                        <img v-if="avatar" class=" tw:inline" :src="avatar" alt="avatar" style="width: 40px;height: 40px;border-radius: 50%;margin: auto;object-fit: cover;">
                    </div>
                    <div style="width: 20%;display: inline-block;text-align: center;">
                        <i v-can="'browse_settings' && 'browse_settings'" @click="$router.push('/administration')" class="fa fa-cog font-22 to_hide color-piketplace" style="color: gray;"></i>
                    </div>
                </div>
                <div style="text-align: center;line-height: 14px;">
                    <label class="color-black ps-2 font-12 break-name" id="user_id" style="" v-html="user?user.fullnameOrUsername:''"></label>
                    <label v-if="user && user.email" class="color-black ps-2 mb-n1 font-12 break-name">
                        {{user.email}}
                    </label>
                </div> -->
                <div style="text-align: center;">
                    <i v-can="'browse_settings' && 'browse_settings'" @click="$router.push({name: 'administration'})" class="fa fa-cog font-22 to_hide color-piketplace" style="color: gray;"></i>
                </div>
                <!-- <div v-if="user">
                    <img :src="user.avatar" style="width: 40px;height: 40px;float: left;margin: 0 5px;border-radius: 50%;object-fit: cover;">
                    <div style="">
                        <h2 class="font-600 font-18 color-piketplace">{{$t('message.hello_user', {name: user.firstname})}}</h2>
                        <h3 class="font-300 color-black" style="line-height: 1;">{{user.email}}</h3>
                    </div>
                </div> -->
                <div v-if="user" class="row font-14 mb-3 mt-3 border-piketplace" style="border-width:1px;border-radius: 10px;padding: 10px;">
                    <a target="_blank" :href="piket_wallet_frontend_url" class="font-300 color-gray font-22" style="color: #999;">
                        <!-- <i class="fa fa-wallet font-22 color-piketplace"></i> -->
                        <svg class="tw:inline" width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M20.4105 9.86058C20.3559 9.8571 20.2964 9.85712 20.2348 9.85715L20.2194 9.85715H17.8015C15.8086 9.85715 14.1033 11.4382 14.1033 13.5C14.1033 15.5618 15.8086 17.1429 17.8015 17.1429H20.2194L20.2348 17.1429C20.2964 17.1429 20.3559 17.1429 20.4105 17.1394C21.22 17.0879 21.9359 16.4495 21.9961 15.5577C22.0001 15.4992 22 15.4362 22 15.3778L22 15.3619V11.6381L22 11.6222C22 11.5638 22.0001 11.5008 21.9961 11.4423C21.9359 10.5506 21.22 9.91209 20.4105 9.86058ZM17.5872 14.4714C18.1002 14.4714 18.5162 14.0365 18.5162 13.5C18.5162 12.9635 18.1002 12.5286 17.5872 12.5286C17.0741 12.5286 16.6581 12.9635 16.6581 13.5C16.6581 14.0365 17.0741 14.4714 17.5872 14.4714Z" fill="#a63289"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M20.2341 18.6C20.3778 18.5963 20.4866 18.7304 20.4476 18.8699C20.2541 19.562 19.947 20.1518 19.4542 20.6485C18.7329 21.3755 17.8183 21.6981 16.6882 21.8512C15.5902 22 14.1872 22 12.4158 22H10.3794C8.60803 22 7.20501 22 6.10697 21.8512C4.97692 21.6981 4.06227 21.3755 3.34096 20.6485C2.61964 19.9215 2.29953 18.9997 2.1476 17.8608C1.99997 16.7541 1.99999 15.3401 2 13.5548V13.4452C1.99998 11.6599 1.99997 10.2459 2.1476 9.13924C2.29953 8.00031 2.61964 7.07848 3.34096 6.35149C4.06227 5.62451 4.97692 5.30188 6.10697 5.14876C7.205 4.99997 8.60802 4.99999 10.3794 5L12.4158 5C14.1872 4.99998 15.5902 4.99997 16.6882 5.14876C17.8183 5.30188 18.7329 5.62451 19.4542 6.35149C19.947 6.84817 20.2541 7.43804 20.4476 8.13012C20.4866 8.26959 20.3778 8.40376 20.2341 8.4L17.8015 8.40001C15.0673 8.40001 12.6575 10.5769 12.6575 13.5C12.6575 16.4231 15.0673 18.6 17.8015 18.6L20.2341 18.6ZM5.61446 8.88572C5.21522 8.88572 4.89157 9.21191 4.89157 9.61429C4.89157 10.0167 5.21522 10.3429 5.61446 10.3429H9.46988C9.86912 10.3429 10.1928 10.0167 10.1928 9.61429C10.1928 9.21191 9.86912 8.88572 9.46988 8.88572H5.61446Z" fill="#a63289"></path> <path d="M7.77668 4.02439L9.73549 2.58126C10.7874 1.80625 12.2126 1.80625 13.2645 2.58126L15.2336 4.03197C14.4103 3.99995 13.4909 3.99998 12.4829 4H10.3123C9.39123 3.99998 8.5441 3.99996 7.77668 4.02439Z" fill="#a63289"></path> </g></svg>
                        {{$t('message.balance.see_wallet')}}
                    </a>
                    <!-- <div class="mt-2">
                        <span class="font-20 mt-0 color-gray font-600">
                            <Amount :amount="pi_balance" class="font-20 color-black font-600" />
                        </span>
                        <span class="font-20 mt-0 color-gray font-600" style="float: right;vertical-align: middle;">
                            <Amount :amount="piket_balance" type="piket" class="font-20 color-black font-600" />
                        </span>
                    </div> -->
                </div>
                <div @click="shareReferralLink" v-if="user" class="mb-3" style="text-align: center;background-color: rgba(171, 214, 227, 0.3);border-radius: 11px;padding: 11px;">       
                    <svg class="tw:inline" width="20px" height="20px" viewBox="-0.5 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M13.47 4.13998C12.74 4.35998 12.28 5.96 12.09 7.91C6.77997 7.91 2 13.4802 2 20.0802C4.19 14.0802 8.99995 12.45 12.14 12.45C12.34 14.21 12.79 15.6202 13.47 15.8202C15.57 16.4302 22 12.4401 22 9.98006C22 7.52006 15.57 3.52998 13.47 4.13998Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>{{$t('message.invite_friends_earn_piket')}}
                </div>
                <!-- <div v-if="user" class="mb-3 btn-dark-piketplace" style="text-align: center;background-color: rgba(171, 214, 227, 0.3);border-radius: 11px;padding: 11px;">
                    <div style="width: 70%;text-align: left;" class="tw:inline-block color-white">
                        <h3 class="color-white" style="line-height: 22px;font-weight: 600;margin-bottom: 8px;">Tasks on Piketplace</h3>
                        <p class="color-white" style="color: #E4E4EA;line-height: 18px;font-weight: 400;">Complete tasks and earn instant rewards</p>
                    </div>
                    <div style="width: 30%;vertical-align: text-bottom;text-align: right;" class="tw:inline-block color-white">
                        <button @click="shareReferralLink" class="btn btn-dark-piketplace-outline tw:inline-block" style="padding: 2px 10px;">
                            Go
                        </button>
                    </div>
                </div> -->
                <!-- <div class="divider"></div> -->
                <!-- <div class="row mb-4 mt-3" style="background-color: #fff;border-radius: 10px;margin-bottom: 5px;">
                    <h4 class="color-black font-600" style="margin-left: 20px;font-size: 14px;">
                        {{$t('message.side_menu.account_balance')}}
                    </h4>
                    <div class="d-flex">
                        <div class="" style="text-align:center;width: 25%;display: inline-block;">
                            <router-link :to="{ name: 'balance'}" class="external-link icon icon-l rounded-s mb-1 icon-rounded-shape">
                                <i class="color-piketplace fas fa-chart-line font-16 align-text-top"></i><br>
                            </router-link>
                            <p class="color-black font-11 text-center opacity-70 mb-2" style="line-height: 11px;">{{$t('message.side_menu.balance')}}</p>
                        </div>
                        <div class="" style="text-align:center;width: 25%;display: inline-block;">
                            <router-link :to="{ name: 'deposit'}" class="external-link icon icon-l rounded-s mb-1 icon-rounded-shape">
                                <i class="color-piketplace fas fa-arrow-down font-16 align-text-top"></i><br>
                            </router-link>
                            <p class="color-black font-11 text-center opacity-70 mb-2" style="line-height: 11px;">{{$t('message.balance.deposit')}}</p>
                        </div>
                        <div class="" style="text-align:center;width: 25%;display: inline-block;">
                            <router-link :to="{ name: 'withdrawal'}" class="external-link icon icon-l rounded-s mb-1 icon-rounded-shape">
                                <i class="color-piketplace fas fa-arrow-up font-16 align-text-top"></i><br>
                            </router-link>
                            <p class="color-black font-11 text-center opacity-70 mb-2" style="line-height: 11px;">{{$t('message.balance.withdrawal')}}</p>
                        </div>
                        <div class="" style="text-align:center;width: 25%;display: inline-block;">
                            <router-link :to="{ name: 'transfer'}" class="external-link icon icon-l rounded-s mb-1  icon-rounded-shape">
                                <i class="color-piketplace fas fa-exchange font-16 align-text-top"></i><br>
                            </router-link>
                            <p class="color-black font-11 text-center opacity-70 mb-2" style="line-height: 11px;">{{$t('message.balance.transfer')}}</p>
                        </div>
                    </div>
                </div> -->
                <div class="row mb-4" style="background-color: #fff;border-radius: 10px;margin-bottom: 5px;">
                    <div class="tw:inline-block border-piketplace" style="background-color: #fff;border-radius: 10px;margin-bottom: 5px;">
                        <h4 class="color-black font-600" style="margin-left: 20px;font-size: 14px;">
                            {{$t('message.side_menu.shop_orders')}}
                        </h4>
                        <div class="d-flex">
                            <div class="" style="text-align:center;width: 25%;display: inline-block;">
                                <router-link :to="{ name: 'my_store'}" class="external-link icon icon-l rounded-s mb-1 icon-rounded-shape">
                                    <svg class="tw:inline tw:m-[10px] mx-auto" width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path opacity="0.4" d="M21.25 5.14999V7.85001C21.25 9.69001 20.69 10.25 18.85 10.25H16.15C14.31 10.25 13.75 9.69001 13.75 7.85001V5.14999C13.75 3.30999 14.31 2.75 16.15 2.75H18.85C20.69 2.75 21.25 3.30999 21.25 5.14999Z" fill="#a63289"></path> <path opacity="0.4" d="M10.25 16.15V18.85C10.25 20.69 9.69 21.25 7.85 21.25H5.15C3.31 21.25 2.75 20.69 2.75 18.85V16.15C2.75 14.31 3.31 13.75 5.15 13.75H7.85C9.69 13.75 10.25 14.31 10.25 16.15Z" fill="#a63289"></path> <path d="M16.6291 11.7501V13.6201C16.6291 15.9001 15.8991 16.6301 13.6191 16.6301H11.7491V16.1501C11.7491 13.4901 10.5091 12.2501 7.84914 12.2501H7.36914V10.3801C7.36914 8.10013 8.09914 7.37012 10.3791 7.37012H12.2491V7.85013C12.2491 10.5101 13.4891 11.7501 16.1491 11.7501H16.6291Z" fill="#a63289"></path> </g></svg>
                                </router-link>
                                <p class="color-black font-11 text-center opacity-70 mb-2" style="line-height: 11px;">{{$t('message.products')}}</p>
                            </div>
                            <div class="" style="text-align:center;width: 25%;display: inline-block;">
                                <router-link :to="{ name: 'my_sales'}" class="external-link icon icon-l rounded-s mb-1 icon-rounded-shape">
                                    <svg class="tw:inline tw:m-[10px] mx-auto" width="20px" height="20px" viewBox="0 0 24 24" id="magicoon-Regular" xmlns="http://www.w3.org/2000/svg" fill="#a63289"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><title>shopping-basket</title> <g id="shopping-basket-Regular"> <path id="shopping-basket-Regular-2" data-name="shopping-basket-Regular" class="cls-1" d="M10.75,15v3a.75.75,0,0,1-1.5,0V15a.75.75,0,0,1,1.5,0ZM14,14.25a.75.75,0,0,0-.75.75v3a.75.75,0,0,0,1.5,0V15A.75.75,0,0,0,14,14.25Zm6.2-1.786-.767,6.011a3.757,3.757,0,0,1-3.72,3.275h-7.4a3.76,3.76,0,0,1-3.718-3.263l-.789-6.022A2.743,2.743,0,0,1,5,7.25H6.576L9.357,2.614a.75.75,0,1,1,1.286.772L8.325,7.25h7.35L13.357,3.386a.75.75,0,0,1,1.286-.772L17.424,7.25H19a2.743,2.743,0,0,1,1.2,5.214Zm-1.549.286H5.355l.727,5.542a2.255,2.255,0,0,0,2.23,1.958h7.4a2.254,2.254,0,0,0,2.232-1.965ZM20.25,10A1.252,1.252,0,0,0,19,8.75H5a1.25,1.25,0,0,0,0,2.5H19A1.252,1.252,0,0,0,20.25,10Z"></path> </g> </g></svg>
                                </router-link>
                                <p class="color-black font-11 text-center opacity-70 mb-2" style="line-height: 11px;">{{$t('message.side_menu.sales')}}</p>
                            </div>
                            <div class="" style="text-align:center;width: 25%;display: inline-block;">
                                <router-link :to="{ name: 'my_orders'}" class="external-link icon icon-l rounded-s mb-1 icon-rounded-shape">
                                    <!-- <i class="color-piketplace fas fa-list-alt font-16 align-text-top"></i> -->
                                    <svg class="tw:inline tw:m-[10px] mx-auto" width="20px" height="20px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill="#a63289" fill-rule="evenodd" d="M6 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3H6zm4 5a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2h-6a1 1 0 0 1-1-1zm0 4a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2h-6a1 1 0 0 1-1-1zm0 4a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2h-6a1 1 0 0 1-1-1zM7 7a1 1 0 0 0 0 2h.001a1 1 0 0 0 0-2H7zm-1 5a1 1 0 0 1 1-1h.001a1 1 0 1 1 0 2H7a1 1 0 0 1-1-1zm1 3a1 1 0 1 0 0 2h.001a1 1 0 1 0 0-2H7z" clip-rule="evenodd"></path></g></svg>
                                </router-link>
                                <p class="color-black font-11 text-center opacity-70 mb-2" style="line-height: 11px;">{{$t('message.orders')}}</p>
                            </div>
                            <div class="" style="text-align:center;width: 25%;display: inline-block;">
                                <router-link :to="{ name: 'my_shipping_apply'}" class="external-link icon icon-l rounded-s mb-1 icon-rounded-shape">
                                    <svg class="tw:inline tw:m-[10px] mx-auto" width="20px" height="20px" fill="#a63289" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Delivery_Truck" data-name="Delivery Truck"> <g> <path d="M21.47,11.185l-1.03-1.43a2.5,2.5,0,0,0-2.03-1.05H14.03V6.565a2.5,2.5,0,0,0-2.5-2.5H4.56a2.507,2.507,0,0,0-2.5,2.5v9.94a1.5,1.5,0,0,0,1.5,1.5H4.78a2.242,2.242,0,0,0,4.44,0h5.56a2.242,2.242,0,0,0,4.44,0h1.22a1.5,1.5,0,0,0,1.5-1.5v-3.87A2.508,2.508,0,0,0,21.47,11.185ZM7,18.935a1.25,1.25,0,1,1,1.25-1.25A1.25,1.25,0,0,1,7,18.935Zm6.03-1.93H9.15a2.257,2.257,0,0,0-4.3,0H3.56a.5.5,0,0,1-.5-.5V6.565a1.5,1.5,0,0,1,1.5-1.5h6.97a1.5,1.5,0,0,1,1.5,1.5ZM17,18.935a1.25,1.25,0,1,1,1.25-1.25A1.25,1.25,0,0,1,17,18.935Zm3.94-2.43a.5.5,0,0,1-.5.5H19.15a2.257,2.257,0,0,0-4.3,0h-.82v-7.3h4.38a1.516,1.516,0,0,1,1.22.63l1.03,1.43a1.527,1.527,0,0,1,.28.87Z"></path> <path d="M18.029,12.205h-2a.5.5,0,0,1,0-1h2a.5.5,0,0,1,0,1Z"></path> </g> </g> </g></svg>
                                </router-link>
                                <p class="color-black font-11 text-center opacity-70 mb-2" style="line-height: 11px;">{{$t('message.side_menu.shipping_applications')}}</p>
                            </div>
                        </div>
                        <div class="d-flex">
                            <div class="" style="text-align:center;width: 25%;display: inline-block;">
                                <router-link :to="{ name: 'message-contacts'}" class="external-link icon icon-l rounded-s mb-1 icon-rounded-shape">
                                    <svg class="tw:inline tw:m-[10px] mx-auto" width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M10 9H17M10 13H17M7 9H7.01M7 13H7.01M21 20L17.6757 18.3378C17.4237 18.2118 17.2977 18.1488 17.1656 18.1044C17.0484 18.065 16.9277 18.0365 16.8052 18.0193C16.6672 18 16.5263 18 16.2446 18H6.2C5.07989 18 4.51984 18 4.09202 17.782C3.71569 17.5903 3.40973 17.2843 3.21799 16.908C3 16.4802 3 15.9201 3 14.8V7.2C3 6.07989 3 5.51984 3.21799 5.09202C3.40973 4.71569 3.71569 4.40973 4.09202 4.21799C4.51984 4 5.0799 4 6.2 4H17.8C18.9201 4 19.4802 4 19.908 4.21799C20.2843 4.40973 20.5903 4.71569 20.782 5.09202C21 5.51984 21 6.0799 21 7.2V20Z" stroke="#a63289" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                                </router-link>
                                <span v-if="nb_messages>0" class="message-badge tw:relative tw:top-[-10px]" :class="[nb_messages>10?'lg-content':'m-content']" style="">{{nb_messages}}</span>
                                <p class="color-black font-11 text-center opacity-70 mb-2" style="line-height: 11px;">{{$t('message.messages')}}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row mb-4" style="background-color: #fff;border-radius: 10px;margin-bottom: 5px;">
                    <div class="tw:inline-block border-piketplace" style="background-color: #fff;border-radius: 10px;margin-bottom: 5px;">
                        <h4 class="color-black font-600" style="margin-left: 20px;font-size: 14px;">{{$t('message.side_menu.services_info')}}</h4>
                        <div class="d-flex">
                            <!-- <div class="" style="text-align:center;width: 20%;display: inline-block;">
                                <a @click="support_func" class="external-link icon icon-l rounded-s mb-1 icon-rounded-shape"><i class="fa fa-headphones font-16 color-piketplace align-text-top"></i><br></a>
                                <p class="color-black font-11 text-center opacity-70 mb-2" style="line-height: 11px;">{{$t('message.side_menu.support')}}</p>
                            </div> -->
                            <div class="" style="text-align:center;width: 25%;display: inline-block;">
                                <router-link :to="{ name: 'info'}" class="external-link icon icon-l rounded-s mb-1 icon-rounded-shape">
                                    <svg class="tw:inline tw:m-[10px] mx-auto" width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 17V11" stroke="#a63289" stroke-width="1.5" stroke-linecap="round"></path> <circle cx="1" cy="1" r="1" transform="matrix(1 0 0 -1 11 9)" fill="#a63289"></circle> <path d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7" stroke="#a63289" stroke-width="1.5" stroke-linecap="round"></path> </g></svg>
                                </router-link>
                                <p class="color-black font-11 text-center opacity-70 mb-2" style="line-height: 11px;">{{$t('message.side_menu.terms_and_conditions')}}</p>
                            </div>
                            <div class="" style="text-align:center;width: 25%;display: inline-block;">
                                <router-link :to="{ name: 'faq'}" class="external-link icon icon-l rounded-s mb-1 icon-rounded-shape">
                                    <svg class="tw:inline tw:m-[10px] mx-auto" width="20px" height="20px" viewBox="0 0 48 48" version="1" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 48 48" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill="#d234ab" d="M15,40h23l6,6V25c0-2.2-1.8-4-4-4H15c-2.2,0-4,1.8-4,4v11C11,38.2,12.8,40,15,40z"></path> <path fill="#fff" d="M28.8,32.8h-3.6l-0.7,2.1h-2.2l3.7-10h1.9l3.7,10h-2.2L28.8,32.8z M25.7,31.2h2.5L27,27.4L25.7,31.2z"></path> <path fill="#a63289" d="M33,25H10l-6,6V8c0-2.2,1.8-4,4-4h25c2.2,0,4,1.8,4,4v13C37,23.2,35.2,25,33,25z"></path> <path fill="#ffffffff" d="M25.4,14.2c0,1-0.2,1.8-0.5,2.5c-0.3,0.7-0.7,1.3-1.3,1.7l1.7,1.3L24,20.9l-2.2-1.7c-0.2,0-0.5,0.1-0.8,0.1 c-0.6,0-1.2-0.1-1.8-0.3c-0.5-0.2-1-0.6-1.4-1c-0.4-0.4-0.7-1-0.9-1.6c-0.2-0.6-0.3-1.3-0.3-2.1v-0.4c0-0.8,0.1-1.5,0.3-2.1 c0.2-0.6,0.5-1.2,0.9-1.6c0.4-0.4,0.8-0.8,1.4-1c0.5-0.2,1.1-0.3,1.8-0.3c0.6,0,1.2,0.1,1.8,0.3c0.5,0.2,1,0.6,1.4,1 c0.4,0.4,0.7,1,0.9,1.6c0.2,0.6,0.3,1.3,0.3,2.1V14.2z M23.2,13.7c0-1.1-0.2-1.9-0.6-2.4c-0.4-0.6-0.9-0.8-1.6-0.8 c-0.7,0-1.3,0.3-1.6,0.8c-0.4,0.6-0.6,1.4-0.6,2.4v0.5c0,0.5,0.1,1,0.2,1.4c0.1,0.4,0.2,0.8,0.4,1c0.2,0.3,0.4,0.5,0.7,0.6 c0.3,0.1,0.6,0.2,0.9,0.2c0.7,0,1.3-0.3,1.6-0.8c0.4-0.6,0.6-1.4,0.6-2.5V13.7z"></path> </g></svg>
                                </router-link>
                                <p class="color-black font-11 text-center opacity-70 mb-2" style="line-height: 11px;">Q&A</p>
                            </div>
                            <div class="" style="text-align:center;width: 25%;display: inline-block;">
                                <router-link :to="{ name: 'partnership'}" class="external-link icon icon-l rounded-s mb-1 icon-rounded-shape">
                                    <svg class="tw:inline tw:m-[10px] mx-auto" width="20px" height="20px" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" fill="#a63289"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>partners-solid</title> <g id="Layer_2" data-name="Layer 2"> <g id="invisible_box" data-name="invisible box"> <rect width="48" height="48" fill="none"></rect> </g> <g id="Q3_icons" data-name="Q3 icons"> <g> <path d="M18.4,13.8A5.9,5.9,0,0,1,23,12.1a7.6,7.6,0,0,1,5.2,2.2c2.9,2.8,3.4,7.2,1,9.7a2.1,2.1,0,0,0,0,2.9,2.4,2.4,0,0,0,1.4.5,1.8,1.8,0,0,0,1.4-.6c3.2-3.3,3.5-8.2,1.3-12.3H34a6.1,6.1,0,0,0,4.5-1.9,6.3,6.3,0,0,0-.2-8.9A6.5,6.5,0,0,0,34,2a6.6,6.6,0,0,0-4.6,1.9,6.3,6.3,0,0,0-1.6,5.3,11.2,11.2,0,0,0-4.7-1.1,9.5,9.5,0,0,0-7.6,3,2,2,0,1,0,2.9,2.7Z"></path> <path d="M21.4,38.4C18,37.5,16,33.6,17,29.7s4.5-6.6,7.9-5.7a2,2,0,0,0,2.4-1.5,1.9,1.9,0,0,0-1.4-2.4,10.4,10.4,0,0,0-11.3,5.1,6.3,6.3,0,0,0-4.3-3.6l-1.4-.2a6.3,6.3,0,0,0-6.1,4.8,6.2,6.2,0,0,0,4.6,7.6l1.5.2a6.2,6.2,0,0,0,3.9-1.4,10.5,10.5,0,0,0,7.7,9.7h.4a2,2,0,0,0,2-1.5A1.9,1.9,0,0,0,21.4,38.4Z"></path> <path d="M40.5,33.9a11.9,11.9,0,0,0,3.3-3.4A9.8,9.8,0,0,0,45,22.4,2,2,0,0,0,42.5,21a2,2,0,0,0-1.3,2.5,5.6,5.6,0,0,1-.8,4.8,8.2,8.2,0,0,1-4.5,3.4C32,32.9,28,31,27,27.7a2,2,0,0,0-2.5-1.4,2,2,0,0,0-1.4,2.5A10.5,10.5,0,0,0,33.2,36a6.3,6.3,0,0,0,5,10,5.7,5.7,0,0,0,1.8-.3,6.3,6.3,0,0,0,.5-11.8Z"></path> </g> </g> </g> </g></svg>
                                </router-link>
                                <p class="color-black font-11 text-center opacity-70 mb-2" style="line-height: 11px;">{{$t('message.partnerships')}}</p>
                            </div>
                            <!-- <div v-if="1" class="" style="text-align:center;width: 20%;display: inline-block;">
                                <router-link :to="{ name: 'ads-earnings'}" class="external-link icon icon-l rounded-s mb-1 icon-rounded-shape">
                                    <i class="fas fa-ad font-16  color-piketplace align-text-top"></i><br>
                                </router-link>
                                <p class="color-black font-11 text-center opacity-70 mb-2" style="line-height: 11px;">{{$t('message.ads_earnings')}}</p>
                            </div> -->
                            <div class="" style="text-align:center;width: 25%;display: inline-block;">
                                <a href="https://mainnet.piketplace.com/piads" target="_blank" class="external-link icon icon-l rounded-s mb-1 icon-rounded-shape">
                                    <svg class="tw:inline tw:m-[10px] mx-auto" width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M5 5H19C20.1046 5 21 5.89543 21 7V17C21 18.1046 20.1046 19 19 19H5C3.89543 19 3 18.1046 3 17V7C3 5.89543 3.89543 5 5 5Z" stroke="#a63289" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M7 15V11C7 9.89543 7.89543 9 9 9V9C10.1046 9 11 9.89543 11 11V15" stroke="#a63289" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M17 9V15" stroke="#a63289" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M17 12H15.5C13.5 12 13.5 15 15.5 15H17" stroke="#a63289" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M7 13H11" stroke="#a63289" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                                </a>
                                <p class="color-black font-11 text-center opacity-70 mb-2" style="line-height: 11px;">{{$t('message.ads_earnings')}}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="user && user.is_partner === true" class="row mb-4" style="background-color: #fff;border-radius: 10px;margin-bottom: 5px;">
                    <div class="tw:inline-block border-piketplace" style="background-color: #fff;border-radius: 10px;margin-bottom: 5px;">
                        <h4 class="color-black font-600" style="margin-left: 20px;font-size: 14px;">{{$t('message.side_menu.country_representative')}}</h4>
                        <div class="d-flex">
                            <div class="" style="text-align:center;width: 25%;display: inline-block;">
                                <router-link :to="{ name: 'partner-account'}" class="external-link icon icon-l rounded-s mb-1 icon-rounded-shape">
                                    <svg class="tw:inline tw:m-[10px] mx-auto" width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M5 21C5 17.134 8.13401 14 12 14C15.866 14 19 17.134 19 21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="#a63289" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                                </router-link>
                                <p class="color-black font-11 text-center opacity-70 mb-2" style="line-height: 11px;">{{$t('message.side_menu.account')}}</p>
                            </div>
                            <div class="" style="text-align:center;width: 25%;display: inline-block;">
                                <router-link :to="{ name: 'partner-orders'}" class="external-link icon icon-l rounded-s mb-1 icon-rounded-shape">
                                    <svg class="tw:inline tw:m-[10px] mx-auto" width="20px" height="20px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill="#a63289" fill-rule="evenodd" d="M6 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3H6zm4 5a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2h-6a1 1 0 0 1-1-1zm0 4a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2h-6a1 1 0 0 1-1-1zm0 4a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2h-6a1 1 0 0 1-1-1zM7 7a1 1 0 0 0 0 2h.001a1 1 0 0 0 0-2H7zm-1 5a1 1 0 0 1 1-1h.001a1 1 0 1 1 0 2H7a1 1 0 0 1-1-1zm1 3a1 1 0 1 0 0 2h.001a1 1 0 1 0 0-2H7z" clip-rule="evenodd"></path></g></svg>
                                </router-link>
                                <p class="color-black font-11 text-center opacity-70 mb-2" style="line-height: 11px;">{{$t('message.side_menu.orders_verification')}}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- <div v-if="user && user.is_partner === true" class="row" style="background-color: #fff;border-radius: 10px;margin-bottom: 5px;">
                    <h4 class="color-piketplace" style="margin-left: 20px;font-size: 14px;">{{$t('message.side_menu.country_representative')}}</h4>
                    <div class="d-flex">
                        <div class="" style="text-align:center;width: 25%;display: inline-block;">
                            <router-link to="{ name: 'profile', params: { username: 'erina' } }/partner-account" class="external-link icon icon-l rounded-s shadow-xl btn-dark-piketplace mb-1"><i class="fas fa-user font-16"></i><br></router-link>
                            <p class="color-piketplace font-11 text-center opacity-70 mb-2" style="line-height: 11px;">{{$t('message.side_menu.account')}}</p>
                        </div>
                        <div class="" style="text-align:center;width: 25%;display: inline-block;">
                            <router-link to="{ name: 'profile', params: { username: 'erina' } }/partner-orders" class="external-link icon icon-l rounded-s shadow-xl btn-dark-piketplace mb-1"><i class="fas fa-list-alt font-16"></i><br></router-link>
                            <p class="color-piketplace font-11 text-center opacity-70 mb-2" style="line-height: 11px;">{{$t('message.side_menu.orders_verification')}}</p>
                        </div>
                    </div>
                </div>
                <div class="row" style="background-color: #fff;border-radius: 10px;margin-bottom: 5px;">
                    <h4 class="color-piketplace" style="margin-left: 20px;font-size: 14px;">{{$t('message.side_menu.services_info')}}</h4>
                    <div class="d-flex">
                        <div class="" style="text-align:center;width: 25%;display: inline-block;">
                            <a @click="support_func" class="external-link icon icon-l rounded-s shadow-xl mb-1"><i class="fa fa-headphones font-16 color-piketplace"></i><br></a>
                            <p class="color-piketplace font-11 text-center opacity-70 mb-2">{{$t('message.side_menu.support')}}</p>
                        </div>
                        <div class="" style="text-align:center;width: 25%;display: inline-block;">
                            <router-link to="{ name: 'profile', params: { username: 'erina' } }/info" class="external-link icon icon-l rounded-s shadow-xl btn-dark-piketplace mb-1"><i class="fas fa-info font-16"></i><br></router-link>
                            <p class="color-piketplace font-11 text-center opacity-70 mb-2" style="line-height: 11px;">{{$t('message.side_menu.terms_and_conditions')}}</p>
                        </div>
                    </div>
                </div> -->
                <div class="row mb-4" style="background-color: #fff;border-radius: 10px;margin-bottom: 5px;">
                    <h4 class="color-black font-600" style="margin-left: 20px;font-size: 14px;">{{$t('message.side_menu.others')}}</h4>
                    <div class="d-flex">
                        <div class="" style="text-align:center;width: 25%;display: inline-block;">
                            <router-link :to="{ name: 'donation'}" class="external-link icon icon-l rounded-s mb-1 icon-rounded-shape">
                                <svg class="tw:inline tw:m-[10px] mx-auto" width="20px" height="20px" fill="#a63289" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 294.5 294.5" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M147.251,80c22.056,0,39.999-17.944,39.999-40S169.307,0,147.251,0c-22.057,0-40.001,17.944-40.001,40 S125.194,80,147.251,80z M147.251,20c11.027,0,19.999,8.972,19.999,20s-8.972,20-19.999,20c-11.028,0-20.001-8.972-20.001-20 S136.223,20,147.251,20z"></path> <path d="M256,109.167h-67.889c1.335-1.7,2.139-3.838,2.139-6.167c0-5.522-4.477-10-10-10h-66c-5.522,0-10,4.478-10,10 c0,2.329,0.804,4.467,2.139,6.167H38.5c-13.785,0-25,11.215-25,25V284.5c0,5.522,4.478,10,10,10H271c5.522,0,10-4.478,10-10 V134.167C281,120.382,269.785,109.167,256,109.167z M261,274.5H33.5V134.167c0-2.71,2.29-5,5-5H256c2.71,0,5,2.29,5,5V274.5z"></path> <path d="M142.3,184.996h23.936c5.523,0,10-4.477,10-10c0-5.522-4.477-10-10-10h-8.986v-7.533c0-5.523-4.478-10-10-10 c-5.523,0-10,4.477-10,10v8.088c-10.7,2.352-18.984,11.953-18.984,23.055c0,12.799,11.007,23.611,24.035,23.611h9.898 c1.962,0,4.037,1.856,4.037,3.611c0,1.753-2.075,3.607-4.037,3.607h-23.934c-5.522,0-10,4.478-10,10c0,5.522,4.478,10,10,10h8.984 v6.77c0,5.522,4.477,10,10,10c5.522,0,10-4.478,10-10v-7.323c10.701-2.352,18.986-11.953,18.986-23.054 c0-12.799-11.008-23.611-24.037-23.611H142.3c-1.961,0-4.035-1.856-4.035-3.611C138.265,186.852,140.339,184.996,142.3,184.996z"></path> </g> </g></svg>
                            </router-link>
                            <p class="color-black font-11 text-center opacity-70 mb-2" style="line-height: 11px;">{{$t('message.side_menu.donate')}}</p>
                        </div>
                        <div class="" style="text-align:center;width: 25%;display: inline-block;">
                            <router-link :to="{ name: 'mining'}" class="external-link icon icon-l rounded-s mb-1 icon-rounded-shape">
                                <svg class="tw:inline tw:m-[10px] mx-auto" width="20px" height="20px" fill="#a63289" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 395 395" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M313.002,0H82C36.785,0,0,36.784,0,81.998v230.993C0,358.211,36.785,395,82,395h231.002 C358.216,395,395,358.211,395,312.991V81.998C395,36.784,358.216,0,313.002,0z M380,312.991C380,349.94,349.944,380,313.002,380H82 c-36.944,0-67-30.06-67-67.009V81.998C15,45.056,45.056,15,82,15h231.002C349.944,15,380,45.056,380,81.998V312.991z"></path> <path d="M206.066,148.713c4.365,10.594,7.783,21.242,10.447,32.552c0.126,0.531,0.467,0.985,0.942,1.254 c0.296,0.168,0.628,0.253,0.961,0.253c0.201,0,0.403-0.031,0.599-0.094l29.854-9.277c0.525-0.164,0.958-0.541,1.191-1.039 c0.232-0.499,0.245-1.072,0.033-1.58l-1.786-4.289c-8.732-20.961-21.787-41.733-39.907-63.502 c-8.58-10.351-18.352-20.709-29.042-30.785c-9.336-8.803-17.988-16.208-26.451-22.639c-0.818-0.622-1.977-0.504-2.655,0.271 c-1.467,1.68-4.529,5.229-4.529,5.229c-0.662,0.769-0.628,1.915,0.08,2.642c0.002,0.002,0.845,0.866,1.092,1.13 c0.869,0.926,1.73,1.863,2.587,2.81c1.669,1.842,3.344,3.746,5.121,5.823c4.078,4.757,8.242,9.904,12.376,15.301 c8.47,11.063,16.124,22.38,22.749,33.636c0.49,0.833,0.956,1.649,1.431,2.473L86.083,187.55 c-5.423,3.544-6.945,10.813-3.401,16.235c2.25,3.443,6.002,5.314,9.829,5.314c2.201,0,4.427-0.619,6.406-1.913l103.194-67.442 C203.527,142.774,204.852,145.764,206.066,148.713z"></path> <polygon points="216.034,256.409 168.184,284.909 107.006,343.877 302.5,343.877 302.5,150.247 259.32,175.203 "></polygon> <polygon points="150.636,240.431 127.918,232.899 125.895,243.949 131.37,261.082 148.5,255.605 "></polygon> <polygon points="120.637,288.958 136.684,297.078 145.724,290.864 142.523,269.946 122.581,273.271 "></polygon> <polygon points="185.995,221.684 174.267,223.639 173.122,232.867 182.561,237.645 187.879,233.993 "></polygon> <polygon points="200.577,216.508 197.659,229.288 203.646,234.588 217.876,228.639 212.013,215.122 "></polygon> <polygon points="175.588,248.105 174.932,253.372 180.318,256.096 183.352,254.009 182.275,246.991 "></polygon> <polygon points="156.7,257.949 160.986,263.21 165.885,261.166 165.58,255.138 162.266,253.537 "></polygon> </g> </g></svg>
                            </router-link>
                            <p class="color-black font-11 text-center opacity-70 mb-2" style="line-height: 11px;">{{$t('message.side_menu.mining')}}</p>
                        </div>
                        <div class="" style="text-align:center;width: 25%;display: inline-block;">
                            <a @click="open_language_select" class="external-link icon icon-l rounded-s mb-1 icon-rounded-shape">
                                <svg class="tw:inline tw:m-[10px] mx-auto" width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path opacity="0.4" d="M16.9198 22.0001C14.1198 22.0001 11.8398 19.7301 11.8398 16.9201C11.8398 14.1201 14.1098 11.8401 16.9198 11.8401C19.7198 11.8401 21.9998 14.1101 21.9998 16.9201C21.9998 19.7301 19.7298 22.0001 16.9198 22.0001Z" fill="#a63289"></path> <path opacity="0.4" d="M5.02 2H8.94C11.01 2 12.01 2.99999 11.96 5.01999V8.94C12.01 11.01 11.01 12.01 8.94 11.96H5.02C3 12 2 11 2 8.92999V5.01001C2 3.00001 3 2 5.02 2Z" fill="#a63289"></path> <path d="M9.00969 8.25992C8.69969 8.25992 8.40969 8.13991 8.13969 7.93991C8.38969 7.53991 8.5697 7.08991 8.6597 6.59991H8.99969C9.40969 6.59991 9.74969 6.25991 9.74969 5.84991C9.74969 5.43991 9.40969 5.09991 8.99969 5.09991H8.00969C7.99969 5.09991 7.9897 5.09991 7.9897 5.09991H7.9697H7.7097C7.6697 4.71991 7.3597 4.41992 6.9697 4.41992C6.5797 4.41992 6.26969 4.71991 6.22969 5.09991H4.9397C4.5297 5.09991 4.1897 5.43991 4.1897 5.84991C4.1897 6.25991 4.5297 6.59991 4.9397 6.59991H7.1097C6.8097 7.55991 5.94969 8.25992 4.92969 8.25992C4.51969 8.25992 4.17969 8.59992 4.17969 9.00992C4.17969 9.41992 4.51969 9.75992 4.92969 9.75992C5.73969 9.75992 6.4897 9.48992 7.1097 9.03992C7.6597 9.49992 8.31969 9.75992 8.99969 9.75992C9.40969 9.75992 9.74969 9.41992 9.74969 9.00992C9.74969 8.59992 9.41969 8.25992 9.00969 8.25992Z" fill="#a63289"></path> <path d="M9 22.75C4.73 22.75 1.25 19.27 1.25 15C1.25 14.59 1.59 14.25 2 14.25C2.41 14.25 2.75 14.59 2.75 15C2.75 17.96 4.81 20.44 7.58 21.09L7.31 20.64C7.1 20.28 7.21001 19.82 7.57001 19.61C7.92001 19.4 8.39001 19.51 8.60001 19.87L9.64999 21.62C9.78999 21.85 9.79 22.14 9.66 22.37C9.52 22.6 9.27 22.75 9 22.75Z" fill="#a63289"></path> <path d="M22.0004 9.75C21.5904 9.75 21.2504 9.41 21.2504 9C21.2504 6.04 19.1904 3.56 16.4204 2.91L16.6904 3.35999C16.9004 3.71999 16.7904 4.18001 16.4304 4.39001C16.0804 4.60001 15.6104 4.49001 15.4004 4.13L14.3504 2.38C14.2104 2.15 14.2104 1.86 14.3404 1.63C14.4704 1.39 14.7204 1.25 14.9904 1.25C19.2604 1.25 22.7404 4.73 22.7404 9C22.7504 9.41 22.4104 9.75 22.0004 9.75Z" fill="#a63289"></path> <path d="M19.7296 18.3301L17.5896 14.0601C17.4596 13.8101 17.1996 13.6401 16.9196 13.6401C16.6396 13.6401 16.3796 13.8001 16.2496 14.0501L14.1096 18.3201C13.9196 18.6901 14.0696 19.1401 14.4496 19.3301C14.5596 19.3801 14.6696 19.4101 14.7796 19.4101C15.0496 19.4101 15.3196 19.2601 15.4496 19.0001L15.6196 18.6601H18.2096L18.3796 19.0001C18.5696 19.3701 19.0196 19.5201 19.3896 19.3401C19.7696 19.1501 19.9196 18.7001 19.7296 18.3301ZM16.3796 17.1601L16.9295 16.0701L17.4796 17.1601H16.3796Z" fill="#a63289"></path> </g></svg>
                            </a>
                            <p class="color-black font-11 text-center opacity-70 mb-2" style="line-height: 11px;">{{$t('message.side_menu.language')}}</p>
                        </div>
                        <div class="" style="text-align:center;width: 25%;display: inline-block;">
                            <router-link :to="{ name: 'my-addresses'}" class="external-link icon icon-l rounded-s mb-1 icon-rounded-shape">
                                <svg class="tw:inline tw:m-[10px] mx-auto" width="20px" height="20px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill="#a63289" fill-rule="evenodd" d="M6 7a1.5 1.5 0 0 1-1.5 1.5A1.467 1.467 0 0 1 3.39 8H1a1 1 0 0 1 0-2h2.39a1.467 1.467 0 0 1 1.11-.5A1.5 1.5 0 0 1 6 7zm0 10a1.5 1.5 0 0 1-1.5 1.5 1.467 1.467 0 0 1-1.11-.5H1a1 1 0 0 1 0-2h2.39a1.467 1.467 0 0 1 1.11-.5A1.5 1.5 0 0 1 6 17z"></path> <path fill="#a63289" fill-rule="evenodd" d="M19 2v20a2.006 2.006 0 0 1-2 2H3a2.006 2.006 0 0 1-2-2v-1a1 1 0 0 1 2 0v.5a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-19a.5.5 0 0 0-.5-.5h-13a.5.5 0 0 0-.5.5V3a1 1 0 0 1-2 0V2a2.006 2.006 0 0 1 2-2h14a2.006 2.006 0 0 1 2 2z"></path> <path fill="#a63289" fill-rule="evenodd" d="M6 12a1.5 1.5 0 0 1-1.5 1.5 1.467 1.467 0 0 1-1.11-.5H1a1 1 0 0 1 0-2h2.39a1.467 1.467 0 0 1 1.11-.5A1.5 1.5 0 0 1 6 12zm7.068 1.167a1.122 1.122 0 0 1-.563-.139.741.741 0 0 1-.341-.444 1.666 1.666 0 0 1-.576.444 1.6 1.6 0 0 1-.655.134 1.243 1.243 0 0 1-.505-.1 1.027 1.027 0 0 1-.36-.261 1.087 1.087 0 0 1-.217-.393 1.629 1.629 0 0 1-.071-.488 1.936 1.936 0 0 1 .067-.5 2.032 2.032 0 0 1 .2-.487 2.125 2.125 0 0 1 .8-.8 2.523 2.523 0 0 1 .614-.233 2.949 2.949 0 0 1 .745-.088 3.118 3.118 0 0 1 .613.052 2.8 2.8 0 0 1 .489.147l-.443 1.6a1.749 1.749 0 0 0-.071.451.6.6 0 0 0 .058.276.294.294 0 0 0 .157.14.635.635 0 0 0 .231.039.654.654 0 0 0 .36-.117 1.021 1.021 0 0 0 .3-.321 1.789 1.789 0 0 0 .205-.491 2.375 2.375 0 0 0 .077-.621A2.434 2.434 0 0 0 14 9.975a1.945 1.945 0 0 0-.523-.713 2.242 2.242 0 0 0-.8-.431 3.4 3.4 0 0 0-1.017-.145 2.912 2.912 0 0 0-1.125.214 2.8 2.8 0 0 0-.9.585 2.667 2.667 0 0 0-.595.876 2.75 2.75 0 0 0-.214 1.087 3.077 3.077 0 0 0 .235 1.244 2.512 2.512 0 0 0 .646.9 2.715 2.715 0 0 0 .966.541 3.838 3.838 0 0 0 1.2.181 5.662 5.662 0 0 0 .664-.036 4.77 4.77 0 0 0 .567-.1 3.987 3.987 0 0 0 .47-.142 2.942 2.942 0 0 0 .378-.17.282.282 0 0 1 .212-.039.2.2 0 0 1 .134.13l.157.383a4.6 4.6 0 0 1-1.12.479 5.3 5.3 0 0 1-1.457.181 4.71 4.71 0 0 1-1.545-.246 3.627 3.627 0 0 1-1.233-.705 3.225 3.225 0 0 1-.811-1.119A3.618 3.618 0 0 1 8 11.446a3.207 3.207 0 0 1 .127-.9 3.327 3.327 0 0 1 .362-.817 3.551 3.551 0 0 1 .567-.7 3.628 3.628 0 0 1 .738-.548A3.8 3.8 0 0 1 11.661 8a3.871 3.871 0 0 1 1.256.205 3.357 3.357 0 0 1 1.065.586 2.862 2.862 0 0 1 .74.932 2.73 2.73 0 0 1 .278 1.24 2.542 2.542 0 0 1-.145.865 2.168 2.168 0 0 1-.406.7 1.913 1.913 0 0 1-.613.468 1.739 1.739 0 0 1-.768.171zm-1.909-.691a.9.9 0 0 0 .242-.034.664.664 0 0 0 .232-.123.945.945 0 0 0 .2-.235 1.36 1.36 0 0 0 .151-.367l.341-1.217a1.757 1.757 0 0 0-.3-.026 1.247 1.247 0 0 0-.535.117 1.352 1.352 0 0 0-.43.315 1.52 1.52 0 0 0-.288.455 1.375 1.375 0 0 0-.106.533.654.654 0 0 0 .127.429.454.454 0 0 0 .366.153z"></path> </g></svg>
                            </router-link>
                            <p class="color-black font-11 text-center opacity-70 mb-2" style="line-height: 11px;">{{$t('message.side_menu.addresses')}}</p>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <button @click="logout" class="btn btn-dark-piketplace">
                        {{$t('message.side_menu.log_out')}}
                    </button>
                </div>
                <!-- <div class="row">
                    <div class="d-flex">
                        <div class="" style="text-align:center;width: 33%;display: inline-block;">
                            <router-link to="{ name: 'profile', params: { username: 'erina' } }/donation" class="external-link icon icon-l rounded-s shadow-xl btn-dark-piketplace mb-1"><i class="fas fa-donate font-16"></i><br></router-link>
                            <p class="color-piketplace font-11 text-center opacity-70 mb-2" style="line-height: 11px;">{{$t('message.side_menu.donate')}}</p>
                        </div>
                        <div class="" style="text-align:center;width: 33%;display: inline-block;">
                            <router-link to="{ name: 'profile', params: { username: 'erina' } }{name: 'profil'}" class="external-link icon icon-l rounded-s shadow-xl btn-dark-piketplace mb-1"><i class="fas fa-user font-16"></i><br></router-link>
                            <p class="color-piketplace font-11 text-center opacity-70 mb-2" style="line-height: 11px;">{{$t('message.side_menu.my_profile')}}</p>
                        </div>
                        <div class="" style="text-align:center;width: 33%;display: inline-block;">
                            <router-link to="{ name: 'profile', params: { username: 'erina' } }/balance" class="external-link icon icon-l rounded-s shadow-xl btn-dark-piketplace mb-1"><i class="fas fa-chart-line font-16"></i><br></router-link>
                            <p class="color-piketplace font-11 text-center opacity-70 mb-2" style="line-height: 11px;">{{$t('message.side_menu.balance')}}</p>
                        </div>
                    </div>
                    <div class="d-flex">
                        <div class="" style="text-align:center;width: 33%;display: inline-block;">
                            <router-link to="{ name: 'profile', params: { username: 'erina' } }/my-store" class="external-link icon icon-l rounded-s shadow-xl btn-dark-piketplace mb-1"><i class="fas fa-store font-16"></i><br></router-link>
                            <p class="color-piketplace font-11 text-center opacity-70 mb-2" style="line-height: 11px;">{{$t('message.side_menu.my_store')}}</p>
                        </div>
                        <div class="" style="text-align:center;width: 33%;display: inline-block;">
                            <router-link to="{ name: 'profile', params: { username: 'erina' } }/my-sales" class="external-link icon icon-l rounded-s shadow-xl btn-dark-piketplace mb-1"><i class="fas fa-store font-16"></i><br></router-link>
                            <p class="color-piketplace font-11 text-center opacity-70 mb-2" style="line-height: 11px;">{{$t('message.side_menu.my_sales')}}</p>
                        </div>
                        <div class="" style="text-align:center;width: 33%;display: inline-block;">
                            <router-link to="{ name: 'profile', params: { username: 'erina' } }/mining" class="external-link icon icon-l rounded-s shadow-xl btn-dark-piketplace mb-1"><i class="fas fa-industry font-16"></i><br></router-link>
                            <p class="color-piketplace font-11 text-center opacity-70 mb-2" style="line-height: 11px;">{{$t('message.side_menu.mining')}}</p>
                        </div>
                    </div>
                    <div class="d-flex">
                        <div class="" style="text-align:center;width: 33%;display: inline-block;">
                            <router-link to="{ name: 'profile', params: { username: 'erina' } }/my-orders" class="external-link icon icon-l rounded-s shadow-xl btn-dark-piketplace mb-1"><i class="fas fa-list-alt font-16"></i><br></router-link>
                            <p class="color-piketplace font-11 text-center opacity-70 mb-2" style="line-height: 11px;">{{$t('message.side_menu.my_orders')}}</p>
                        </div>
                        <div class="" style="text-align:center;width: 33%;display: inline-block;">
                            <router-link to="{ name: 'profile', params: { username: 'erina' } }/my/shipping/apply" class="external-link icon icon-l rounded-s shadow-xl btn-dark-piketplace mb-1"><i class="fas fa-shipping-fast font-16"></i><br></router-link>
                            <p class="color-piketplace font-11 text-center opacity-70 mb-2" style="line-height: 11px;">{{$t('message.side_menu.my_shipping_applications')}}</p>
                        </div>
                        <div class="" style="text-align:center;width: 33%;display: inline-block;">
                            <router-link to="{ name: 'profile', params: { username: 'erina' } }/my-addresses" class="external-link icon icon-l rounded-s shadow-xl btn-dark-piketplace mb-1"><i class="fas fa-address-card-o font-16"></i><br></router-link>
                            <p class="color-piketplace font-11 text-center opacity-70 mb-2" style="line-height: 11px;">{{$t('message.side_menu.my_addresses')}}</p>
                        </div>
                        
                    </div>
                    <div class="d-flex">
                        <div class="" style="text-align:center;width: 33%;display: inline-block;">
                            <router-link to="{ name: 'profile', params: { username: 'erina' } }/info" class="external-link icon icon-l rounded-s shadow-xl btn-dark-piketplace mb-1"><i class="fas fa-info font-16"></i><br></router-link>
                            <p class="color-piketplace font-11 text-center opacity-70 mb-2" style="line-height: 11px;">{{$t('message.side_menu.terms_and_conditions')}}</p>
                        </div>
                        <div class="" style="text-align:center;width: 33%;display: inline-block;">
                            <router-link to="{ name: 'profile', params: { username: 'erina' } }/user-settings" class="external-link icon icon-l rounded-s shadow-xl btn-dark-piketplace mb-1"><i class="fas fa-cog font-16"></i><br></router-link>
                            <p class="color-piketplace font-11 text-center opacity-70 mb-2" style="line-height: 11px;">{{$t('message.side_menu.settings')}}</p>
                        </div>
                        <div v-if="user && user.is_partner === true" class="" style="text-align:center;width: 33%;display: inline-block;">
                            <router-link to="{ name: 'profile', params: { username: 'erina' } }/partner-account" class="external-link icon icon-l rounded-s shadow-xl btn-dark-piketplace mb-1"><i class="fas fa-group font-16"></i><br></router-link>
                            <p class="color-piketplace font-11 text-center opacity-70 mb-2" style="line-height: 11px;">{{$t('message.side_menu.representative_account')}}</p>
                        </div>
                    </div>
                    <div class="d-flex">
                        <div class="" style="text-align:center;width: 33%;display: inline-block;">
                            <a @click="support_func" class="external-link icon icon-l rounded-s shadow-xl mb-1"><i class="fa fa-headphones font-16 color-piketplace"></i><br></a>
                            <p class="color-piketplace font-11 text-center opacity-70 mb-2">{{$t('message.side_menu.support')}}</p>
                        </div>
                        <div class="" style="text-align:center;width: 33%;display: inline-block;">
                            <a @click="clearCache($confirm)" class="external-link icon icon-l rounded-s shadow-xl mb-1"><i class="fa fa-eraser font-16 color-piketplace"></i><br></a>
                            <p class="color-piketplace font-11 text-center opacity-70 mb-2">{{$t('message.side_menu.clear_cache')}}</p>
                        </div>
                        <div class="" style="text-align:center;width: 33%;display: inline-block;">
                            <a @click="logout" class="external-link icon icon-l rounded-s shadow-xl mb-1"><i class="fa fa-sign-out font-16 color-piketplace"></i><br></a>
                            <p class="color-piketplace font-11 text-center opacity-70 mb-2">{{$t('message.side_menu.log_out')}}</p>
                        </div>
                    </div>
                </div> -->
            </div>
        </div>
        <div  v-if="!isLoggedIn && !etn_project" class="tw:absolute tw:top-0 tw:left-0 tw:w-full tw:h-full tw:bg-white tw:text-center" style="background-color: rgba(255,255,255,0.9);">
            <div class="social-media" style="height: 30px;margin-top: 12px;">
                <a target="_blank" href="https://www.facebook.com/Piketplace" class="icon icon-xs rounded-xl bg-facebook">
                    <i class="fab fa-facebook"></i>
                </a>&nbsp;
                <a target="_blank" href="https://instagram.com/piketplace?igshid=YmMyMTA2M2Y=" class="icon icon-xs rounded-xl instagram-bg">
                    <i class="fab fa-instagram"></i>
                </a>&nbsp;
                <a target="_blank" href="https://youtube.com/channel/UCT0Go6iqIjdFm7q_K4Yi54g" class="icon icon-xs rounded-xl bg-red-dark">
                    <i class="fab fa-youtube"></i>
                </a>&nbsp;
                <a target="_blank" href="https://twitter.com/piketplace?t=bdCmzk09mjZMAZkyQzuj9Q&s=09" class="icon icon-xs rounded-xl bg-twitter">
                    <i class="fab fa-twitter"></i>
                </a>&nbsp;
                <a target="_blank" href="https://t.me/+GgzdUoBysnw0ODY0" class="icon icon-xs rounded-xl bg-telegram">
                    <i class="fab fa-telegram"></i>
                </a>
            </div>
            <!-- <div class="vertical-center">
                <router-link to="{ name: 'profile', params: { username: 'erina' } }/connexion" class="btn btn-xxs mb-3 rounded-s font-900 shadow-s bg-highlight" style="min-width: 100px;">
                    {{$t('message.log_in')}}
                </router-link>
            </div> -->
            <div class="vertical-center">
                <div style="width: 100%;">
                    <div style="width: 100%;text-align: center;">
                        <a @click="start_connexion" class="btn btn-xxs mb-3 rounded-s font-900 shadow-s btn-dark-piketplace" style="min-width: 100px;">
                            {{$t('message.log_in')}}
                        </a>
                    </div>
                    <div style="width: 100%;text-align: center;">
                        <a @click="open_language_select">
                            <svg class="tw:inline tw:m-[10px] mx-auto" width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path opacity="0.4" d="M16.9198 22.0001C14.1198 22.0001 11.8398 19.7301 11.8398 16.9201C11.8398 14.1201 14.1098 11.8401 16.9198 11.8401C19.7198 11.8401 21.9998 14.1101 21.9998 16.9201C21.9998 19.7301 19.7298 22.0001 16.9198 22.0001Z" fill="#a63289"></path> <path opacity="0.4" d="M5.02 2H8.94C11.01 2 12.01 2.99999 11.96 5.01999V8.94C12.01 11.01 11.01 12.01 8.94 11.96H5.02C3 12 2 11 2 8.92999V5.01001C2 3.00001 3 2 5.02 2Z" fill="#a63289"></path> <path d="M9.00969 8.25992C8.69969 8.25992 8.40969 8.13991 8.13969 7.93991C8.38969 7.53991 8.5697 7.08991 8.6597 6.59991H8.99969C9.40969 6.59991 9.74969 6.25991 9.74969 5.84991C9.74969 5.43991 9.40969 5.09991 8.99969 5.09991H8.00969C7.99969 5.09991 7.9897 5.09991 7.9897 5.09991H7.9697H7.7097C7.6697 4.71991 7.3597 4.41992 6.9697 4.41992C6.5797 4.41992 6.26969 4.71991 6.22969 5.09991H4.9397C4.5297 5.09991 4.1897 5.43991 4.1897 5.84991C4.1897 6.25991 4.5297 6.59991 4.9397 6.59991H7.1097C6.8097 7.55991 5.94969 8.25992 4.92969 8.25992C4.51969 8.25992 4.17969 8.59992 4.17969 9.00992C4.17969 9.41992 4.51969 9.75992 4.92969 9.75992C5.73969 9.75992 6.4897 9.48992 7.1097 9.03992C7.6597 9.49992 8.31969 9.75992 8.99969 9.75992C9.40969 9.75992 9.74969 9.41992 9.74969 9.00992C9.74969 8.59992 9.41969 8.25992 9.00969 8.25992Z" fill="#a63289"></path> <path d="M9 22.75C4.73 22.75 1.25 19.27 1.25 15C1.25 14.59 1.59 14.25 2 14.25C2.41 14.25 2.75 14.59 2.75 15C2.75 17.96 4.81 20.44 7.58 21.09L7.31 20.64C7.1 20.28 7.21001 19.82 7.57001 19.61C7.92001 19.4 8.39001 19.51 8.60001 19.87L9.64999 21.62C9.78999 21.85 9.79 22.14 9.66 22.37C9.52 22.6 9.27 22.75 9 22.75Z" fill="#a63289"></path> <path d="M22.0004 9.75C21.5904 9.75 21.2504 9.41 21.2504 9C21.2504 6.04 19.1904 3.56 16.4204 2.91L16.6904 3.35999C16.9004 3.71999 16.7904 4.18001 16.4304 4.39001C16.0804 4.60001 15.6104 4.49001 15.4004 4.13L14.3504 2.38C14.2104 2.15 14.2104 1.86 14.3404 1.63C14.4704 1.39 14.7204 1.25 14.9904 1.25C19.2604 1.25 22.7404 4.73 22.7404 9C22.7504 9.41 22.4104 9.75 22.0004 9.75Z" fill="#a63289"></path> <path d="M19.7296 18.3301L17.5896 14.0601C17.4596 13.8101 17.1996 13.6401 16.9196 13.6401C16.6396 13.6401 16.3796 13.8001 16.2496 14.0501L14.1096 18.3201C13.9196 18.6901 14.0696 19.1401 14.4496 19.3301C14.5596 19.3801 14.6696 19.4101 14.7796 19.4101C15.0496 19.4101 15.3196 19.2601 15.4496 19.0001L15.6196 18.6601H18.2096L18.3796 19.0001C18.5696 19.3701 19.0196 19.5201 19.3896 19.3401C19.7696 19.1501 19.9196 18.7001 19.7296 18.3301ZM16.3796 17.1601L16.9295 16.0701L17.4796 17.1601H16.3796Z" fill="#a63289"></path> </g></svg>
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <div  v-if="!isLoggedIn && etn_project" class="tw:absolute tw:top-0 tw:left-0 tw:w-full tw:h-full tw:bg-white tw:text-center" style="">
            <h2 class="mt-2">Connexion</h2>
            <div class="">
                <div class=" tw:w-full tw:max-[399px]:w-[100%] tw:min-[400px]:w-3/4 tw:min-[520px]:w-1/2 tw:sm:w-1/2 tw:md:w-1/3 tw:lg:w-1/4 tw:xl:w-1/4 mx-auto" style="">
                    <div class="" style="text-align: center;">
                        <form class="content mb-0" id="produit-form">
                            <div class="input-style has-borders validate-field mb-2" style="width: 100%;display: inline-block;">
                                <input type="text" class="form-control validate-name" id="form1" :placeholder="$t('message.enter_username_or_email')" v-model="form.username" maxlength="40">
                                <label for="form1" class="color-piketplace">{{ $t('message.enter_username_or_email') }}</label>
                            </div>
                            <div class="input-style has-borders validate-field mb-2" style="width: 100%;display: inline-block;">
                                <input type="password" class="form-control validate-name" id="form1" :placeholder="$t('message.enter_password')" v-model="form.password" maxlength="40">
                                <label for="form1" class="color-piketplace">{{ $t('message.enter_password') }}</label>
                            </div>
                            <div @click="front_login"
                            class="btn btn-3d btn-m btn-full mb-1 rounded-xl text-uppercase font-900 shadow-s btn-dark-piketplace" style="margin-top: 0px;">
                                {{$t('message.log_in')}}
                            </div>
                        </form>
                        <div class="tw:w-full tw:flex">
                            <div class="tw:w-1/2 tw:leading-[14px]">
                                <div class="tw:text-left mx-3">
                                    <router-link :to="{name:'registration'}" class="color-piketplace font-14">
                                        {{$t('message.sign_up')}}
                                    </router-link>
                                </div>
                            </div>
                            <div class="tw:w-1/2 tw:leading-[14px]">
                                <div class="tw:text-right mx-3">
                                    <a class="color-piketplace font-14">{{ $t('message.forgotten_password') }}</a>
                                </div>
                            </div>
                        </div>
                        <!-- <div class="tw:text-right mx-3">
                            <a class="color-piketplace">{{ $t('message.forgotten_password') }}</a>
                        </div> -->
                    </div>
                    <hr>
                    <div class="row mb-4" style="background-color: #fff;border-radius: 10px;margin-bottom: 5px;">
                        <div class="tw:inline-block border-piketplace" style="background-color: #fff;border-radius: 10px;margin-bottom: 5px;">
                            <h4 class="color-black font-600" style="margin-left: 20px;font-size: 14px;">
                                Login with
                            </h4>
                            <button v-if="logging" type="button" class="tw:bg-indigo-500 ..." disabled>
                                <svg class="tw:mr-3 tw:size-5 tw:animate-spin tw:inline" width="64px" height="64px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 3C10.22 3 8.47991 3.52784 6.99987 4.51677C5.51983 5.50571 4.36628 6.91131 3.68509 8.55585C3.0039 10.2004 2.82567 12.01 3.17294 13.7558C3.5202 15.5016 4.37737 17.1053 5.63604 18.364C6.89472 19.6226 8.49836 20.4798 10.2442 20.8271C11.99 21.1743 13.7996 20.9961 15.4442 20.3149C17.0887 19.6337 18.4943 18.4802 19.4832 17.0001C20.4722 15.5201 21 13.78 21 12" stroke="#a63289" stroke-width="2" stroke-linecap="round"></path> <path d="M19.7942 7.5C19.8905 7.66673 19.9813 7.83651 20.0667 8.00907" stroke="#a63289" stroke-width="2" stroke-linecap="round"></path> </g></svg>  Processing…
                            </button>
                            <div class="d-flex">
                                <div class="" style="text-align:center;width: 33%;display: inline-block;">
                                    <a @click="start_connexion" class="external-link icon icon-l rounded-s mb-1 icon-rounded-shape">
                                        <img src="/pi.png" class="tw:rounded-full">
                                    </a>
                                    <p class="color-black font-11 tw:text-center opacity-70 mb-2" style="line-height: 11px;">Pi Network</p>
                                </div>
                                <div class="" style="text-align:center;width: 33%;display: inline-block;">
                                    <a @click="loginGoogle" class="external-link icon icon-l rounded-s mb-1 icon-rounded-shape">
                                        <svg viewBox="-0.5 0 48 48" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>Google-color</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="Color-" transform="translate(-401.000000, -860.000000)"> <g id="Google" transform="translate(401.000000, 860.000000)"> <path d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24" id="Fill-1" fill="#FBBC05"> </path> <path d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333" id="Fill-2" fill="#EB4335"> </path> <path d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667" id="Fill-3" fill="#34A853"> </path> <path d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24" id="Fill-4" fill="#4285F4"> </path> </g> </g> </g> </g></svg>
                                    </a>
                                    <p class="color-black font-11 tw:text-center opacity-70 mb-2" style="line-height: 11px;">Google</p>
                                </div>
                                <div class="" style="text-align:center;width: 33%;display: inline-block;">
                                    <a @click="logInWithFacebook" class="external-link icon icon-l rounded-s mb-1 icon-rounded-shape">
                                        <svg viewBox="126.445 2.281 589 589" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><circle cx="420.945" cy="296.781" r="294.5" fill="#3c5a9a"></circle><path d="M516.704 92.677h-65.239c-38.715 0-81.777 16.283-81.777 72.402.189 19.554 0 38.281 0 59.357H324.9v71.271h46.174v205.177h84.847V294.353h56.002l5.067-70.117h-62.531s.14-31.191 0-40.249c0-22.177 23.076-20.907 24.464-20.907 10.981 0 32.332.032 37.813 0V92.677h-.032z" fill="#ffffff"></path></g></svg>
                                    </a>
                                    <p class="color-black font-11 tw:text-center opacity-70 mb-2" style="line-height: 11px;">Facebook</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr>
                    <div style="width: 100%;text-align: center;">
                        <a @click="open_language_select">
                            <svg class="tw:inline tw:m-[10px] mx-auto" width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path opacity="0.4" d="M16.9198 22.0001C14.1198 22.0001 11.8398 19.7301 11.8398 16.9201C11.8398 14.1201 14.1098 11.8401 16.9198 11.8401C19.7198 11.8401 21.9998 14.1101 21.9998 16.9201C21.9998 19.7301 19.7298 22.0001 16.9198 22.0001Z" fill="#a63289"></path> <path opacity="0.4" d="M5.02 2H8.94C11.01 2 12.01 2.99999 11.96 5.01999V8.94C12.01 11.01 11.01 12.01 8.94 11.96H5.02C3 12 2 11 2 8.92999V5.01001C2 3.00001 3 2 5.02 2Z" fill="#a63289"></path> <path d="M9.00969 8.25992C8.69969 8.25992 8.40969 8.13991 8.13969 7.93991C8.38969 7.53991 8.5697 7.08991 8.6597 6.59991H8.99969C9.40969 6.59991 9.74969 6.25991 9.74969 5.84991C9.74969 5.43991 9.40969 5.09991 8.99969 5.09991H8.00969C7.99969 5.09991 7.9897 5.09991 7.9897 5.09991H7.9697H7.7097C7.6697 4.71991 7.3597 4.41992 6.9697 4.41992C6.5797 4.41992 6.26969 4.71991 6.22969 5.09991H4.9397C4.5297 5.09991 4.1897 5.43991 4.1897 5.84991C4.1897 6.25991 4.5297 6.59991 4.9397 6.59991H7.1097C6.8097 7.55991 5.94969 8.25992 4.92969 8.25992C4.51969 8.25992 4.17969 8.59992 4.17969 9.00992C4.17969 9.41992 4.51969 9.75992 4.92969 9.75992C5.73969 9.75992 6.4897 9.48992 7.1097 9.03992C7.6597 9.49992 8.31969 9.75992 8.99969 9.75992C9.40969 9.75992 9.74969 9.41992 9.74969 9.00992C9.74969 8.59992 9.41969 8.25992 9.00969 8.25992Z" fill="#a63289"></path> <path d="M9 22.75C4.73 22.75 1.25 19.27 1.25 15C1.25 14.59 1.59 14.25 2 14.25C2.41 14.25 2.75 14.59 2.75 15C2.75 17.96 4.81 20.44 7.58 21.09L7.31 20.64C7.1 20.28 7.21001 19.82 7.57001 19.61C7.92001 19.4 8.39001 19.51 8.60001 19.87L9.64999 21.62C9.78999 21.85 9.79 22.14 9.66 22.37C9.52 22.6 9.27 22.75 9 22.75Z" fill="#a63289"></path> <path d="M22.0004 9.75C21.5904 9.75 21.2504 9.41 21.2504 9C21.2504 6.04 19.1904 3.56 16.4204 2.91L16.6904 3.35999C16.9004 3.71999 16.7904 4.18001 16.4304 4.39001C16.0804 4.60001 15.6104 4.49001 15.4004 4.13L14.3504 2.38C14.2104 2.15 14.2104 1.86 14.3404 1.63C14.4704 1.39 14.7204 1.25 14.9904 1.25C19.2604 1.25 22.7404 4.73 22.7404 9C22.7504 9.41 22.4104 9.75 22.0004 9.75Z" fill="#a63289"></path> <path d="M19.7296 18.3301L17.5896 14.0601C17.4596 13.8101 17.1996 13.6401 16.9196 13.6401C16.6396 13.6401 16.3796 13.8001 16.2496 14.0501L14.1096 18.3201C13.9196 18.6901 14.0696 19.1401 14.4496 19.3301C14.5596 19.3801 14.6696 19.4101 14.7796 19.4101C15.0496 19.4101 15.3196 19.2601 15.4496 19.0001L15.6196 18.6601H18.2096L18.3796 19.0001C18.5696 19.3701 19.0196 19.5201 19.3896 19.3401C19.7696 19.1501 19.9196 18.7001 19.7296 18.3301ZM16.3796 17.1601L16.9295 16.0701L17.4796 17.1601H16.3796Z" fill="#a63289"></path> </g></svg>
                        </a>
                    </div>
                    <!-- <div style="width: 100%;text-align: center;">
                        <a @click="clearCache($confirm)">
                            <i class="fa fa-eraser color-piketplace font-18"></i>
                            {{$t('message.side_menu.clear_cache')}}
                        </a>
                    </div> -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from "axios";

    import { mapState, mapWritableState, mapActions } from 'pinia'
    import { useStore } from '../stores'

    import { decodeCredential, googleTokenLogin } from 'vue3-google-login'

    export default {
        data() {
            return {
                code: '',
                nb_support_messages: 0,
                avatar: null,
                /*user: {
                    fullnameOrUsername: '',
                    avatar: '',
                    nbNewMessages: 0,
                    isAdmin: false,
                },*/
                isDefault: true,
                isLoading: true,
                nb_messages: 0,
                logging: false,
                form: {
                    username: "sewovonjess@gmail.com",
                    password: "Sewovon@2025",
                },
                etn_project: true,
            };
        },
        computed: {
            ...mapWritableState(useStore, ['pageTitle', 'isLoggedIn', 'isPiBrowser', 'pibrowser_verification', 'user', 'mining_activation', 'user_country', 'session_expired', 'project_type', 'pi_balance', 'piket_balance', 'piket_wallet_frontend_url', 'activate_pi_ads', 'referral_token_amount_sponsor', 'referral_token_amount_child']),
        },
        mounted(){
            this.initLoaders()
            this.avatar = this.user?this.user.avatar:null;
            this.nb_messages = this.user?this.user.nbPendingOrderMessages:0
            this.$functions.scrollToTop()
            if (this.session_expired === true) {
                this.session_expired = false
                this.$functions.msg_box(this, 'info', this.$t('message.info'), this.$t('message.session_expired'))
            }
            this.setBalance()

            this.loadFacebookSDK(document, 'script', 'facebook-jssdk')
            this.initFacebook()
        },
        methods:{
            ...mapActions(useStore, ['login', 'signOut', 'clearCache', 'showPiAdsRewarded', 'showPiAdsInterstitial', 'setBalance', 'initLoaders', 'setLoggedIn', 'setToken']),
            shareReferralLink() {
              let username = ''
              if (this.user) {
                  username = this.user.username
              }
              let referral_link = 'https://'+this.project_type.toLowerCase()+'.piketplace.com?referral='+username
              let amount = this.referral_token_amount_sponsor
              let message = this.$t('message.referral_link_message_to_share', {amount: amount, link: referral_link})
              let title = this.$t('message.share_referral_link')
              Pi.openShareDialog(title, message)
            },
            async getCode(){
                let res = await axios.get('https://ipapi.co/json')
                .then(res => {
                    this.code = res.data.country.toLowerCase();
                })
                .catch(error => {});
            },
            redirect_function() {
                this.$router.push({name: 'profil'});
            },
            open_language_select() {
                this.$hide_modal.hide_modal('menu-main');

                document.getElementById('menu-language').classList.add('menu-active');
                document.getElementsByClassName('menu-hider')[0].classList.add('menu-active');
            },
            logout() {
                FB.logout();
                this.$hide_modal.hide_modal('menu-main');
                this.$functions.scrollToTop()
                this.$functions.msg_box(this, 'confirm', this.$t('message.deconnection'), this.$t('message.confirmation.you_sure'), 'logout')
            },
            start_connexion() {
                /*if (this.pibrowser_verification && !this.isPiBrowser) {
                    this.$functions.msg_box(this, 'info', this.$t('message.info'), this.$t('message.please_use_pi_browser'))
                    return
                }*/
                this.login({self: this})
                /*this.$router.push('/connexion');*/
            },
            front_login() {
                this.logging = true
                axios.post(`/front/login`, this.form)
                .then(res => {
                    this.logging = false
                    console.log('front_login', res.data)
                    //if (res.data.status == "success") {
                    if (res.data.status) {
                        this.form.username = ""
                        this.form.password = ""
                        this.setLoggedIn(true)
                        this.setToken(res.data.token)
                        let message_login = 'message.login_successfull'
                        if (res.data.state == 'new') {
                            message_login = 'message.login_successfull'
                        }
                        this.$functions.msg_box(this, 'success', this.$t('message.connection'), this.$t(message_login))
                    }else if(res.data.message){
                        this.$functions.msg_box(this, 'error', this.$t("message.info"), this.$t(res.data.message))
                    }else{
                        this.$functions.msg_box(this, 'error', this.$t("message.info"), this.$t("message.an_error_occured"))
                    }
                })
                .catch(error => {
                    this.logging = false
                    this.$functions.msg_box(this, 'error', this.$t("message.info"), this.$t("message.an_error_occured"))
                });
            },
            support_func(){
                let img = '/site_images/confirm.PNG'
                let msg = this.$t('message.redirect_to_support')
                msg = '<br><img class="m-auto" src="'+img+'"><br><strong style="font-size:16px;">'+msg+'<strong>'
                this.$confirm({
                  title: "Info",
                  message: msg,
                  button: {
                    //yes: 'OK'
                    yes: this.$t('message.confirmation.yes_continue'),
                    no: this.$t('message.no')
                  },
                  html: true
                    ,
                    /**
                    * Callback Function
                    * @param {Boolean} confirm
                    */
                    callback: confirm => {
                        if (confirm) {
                            window.open('https://piketplace.com', '_blank');
                        }
                    }
                })
            },
            save_user_country(){
                //ALTER TABLE `pi_users` ADD `user_country` LONGTEXT NULL AFTER `addresses`; 
                axios.post(`/save-user-country`, {country: this.user_country})
                .then(res => {
                })
                .catch(error => {
                    
                });
            },
            loginGoogle(){
                let self = this
                googleTokenLogin().then((response) => {
                    console.log("Handle the response", response)
                    self.logging = true
                    let data = {
                        provider: "google",
                        access_provider_token: response.access_token,
                    }
                    axios.post(`/login/callback`, data)
                    .then(res => {
                        self.logging = false
                        console.log("/login/callback Handle the response", res)
                        if (res.data.status == "success") {
                            this.setLoggedIn(true)
                            this.setToken(res.data.token)
                            let message_login = 'message.login_successfull'
                            if (res.data.state == 'new') {
                                message_login = 'message.login_successfull'
                            }
                            this.$functions.msg_box(this, 'success', this.$t('message.connection'), this.$t(message_login))
                        }else{
                            this.$functions.msg_box(this, 'error', this.$t("message.info"), this.$t("message.an_error_occured"))
                        }
                    })
                    .catch(error => {
                        self.logging = false
                        self.$functions.msg_box(self, 'error', self.$t("message.info"), self.$t("message.an_error_occured"))
                    });
                })
            },
            logInWithFacebook () {
                let self = this
                window.FB.login(function (response) {
                    if (response.authResponse) {
                        // Now you can redirect the user or do an AJAX request 
                        // here I sent authResponse From Facebook to My Request API
                        //alert('Lgin: Good to see you, ' + '.'+JSON.stringify(response))
                        self.facebookBackendLogin(response.authResponse)
                    } else {
                        console.log('User cancelled login or did not fully authorize.')
                    }
                })
                return false
            },
            initFacebook () {
              window.fbAsyncInit = function () {
                window.FB.init({
                  appId: '978448042638184', //App ID, You will need to change this
                  cookie: true, // This is important, it's not enabled by default
                  xfbml: true,
                  version: 'v11.0' // version v16.0
                })
              }
            },
            loadFacebookSDK (d, s, id) {
              const fjs = d.getElementsByTagName(s)[0]
              if (d.getElementById(id)) {
                return
              }
              const js = d.createElement(s)
              js.id = id
              js.src = 'https://connect.facebook.net/en_US/sdk.js'
              fjs.parentNode.insertBefore(js, fjs)
            },
            facebookBackendLogin(response) {
                //sent name provider with token to Socialite package to get use object
                console.log("Handle the response", response)
                this.logging = true
                let data = {
                    provider: "facebook",
                    access_provider_token: response.accessToken,
                }
                //alert('just before callback '+JSON.stringify(data))
                axios.post(`/login/callback`, data)
                //axios.post(`save-user-country`, data)
                .then(res => {
                    this.logging = false
                    console.log("/login/callback Handle the response", res)
                    //alert('res after callback '+JSON.stringify(res.data))
                    if (res.data.status == "success") {
                        this.setLoggedIn(true)
                        this.setToken(res.data.token)
                        let message_login = 'message.login_successfull'
                        if (res.data.state == 'new') {
                            message_login = 'message.login_successfull'
                        }
                        this.$functions.msg_box(this, 'success', this.$t('message.connection'), this.$t(message_login))
                    }else{
                        this.$functions.msg_box(this, 'error', this.$t("message.info"), this.$t("message.an_error_occured"))
                    }
                })
                .catch(error => {
                    //alert('error')
                    //alert('error after callback '+JSON.stringify(error))
                    this.logging = false
                    this.$functions.msg_box(this, 'error', this.$t("message.info"), this.$t("message.an_error_occured"))
                });
            },
        },
        watch:{
            user(newVal, oldVal){
                console.log('sidemenu in watch')
                this.avatar = newVal?newVal.avatar:null;
            },
            isLoggedIn(newVal, oldVal){
                //console.log(newVal, oldVal, this.user_country, this.user)
                if (newVal === true && this.user_country !== null && (this.user.user_country==null || this.user.user_country.iso2 !== this.user_country.iso2)) {
                    this.save_user_country()
                }
                if (newVal === true) {
                    //this.showPiAdsRewarded("after-connexion")
                    //this.showPiAdsInterstitial(false)
                }
            }
        }
    }
</script>


<style scoped>
    .message-badge {
      color: white;
      background-color: red;
      border-radius: 50%;
      margin-left: -8px;
    }
    .lg-content{
        padding: 3px 4px;
    }
    .m-content{
        padding: 1px 4px;
    }
    .list-custom-small a i:first-child {
      margin-top: 0;
    }
    .list-custom-small {
      line-height: 30px;
    }
    .list-custom-small a i:first-child {
      margin-left: 0;
    }
    .break-name{
        width: 190px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        display: inline-block;
        padding-bottom: 0px;
        margin-bottom: -7px!important;
    }
    .icon-l i {
      width: 30px;
      line-height: 30px;
      font-size: 17px;
      color: #fff;
    }
    .card {
      margin-bottom: 20px;
    }
    .row {
      --bs-gutter-x:0;
    }
    .menu-title{
        margin-left: 11px;
    }
    .piketplace-menu-shadow{
        box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
        border-radius: 20px;
        margin-top: 10px;
    }

    .icon-rounded-shape{
        background-color: rgba(171, 214, 227, 0.3);
        border-radius: 50% !important;
        width: 40px;
        height: 40px;
    }

</style>