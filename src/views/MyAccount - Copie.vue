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
                        <i @click="$router.push({name: 'profil'})" class="fa fa-edit color-piketplace tw-inline"></i>
                        <img v-if="avatar" class=" tw-inline" :src="avatar" alt="avatar" style="width: 40px;height: 40px;border-radius: 50%;margin: auto;object-fit: cover;">
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
                        <i class="fa fa-wallet font-22 color-piketplace"></i>
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
                    <i class="fa fa-share font-12">&nbsp;{{$t('message.invite_friends_earn_piket')}}</i>
                </div>
                <!-- <div v-if="user" class="mb-3 btn-dark-piketplace" style="text-align: center;background-color: rgba(171, 214, 227, 0.3);border-radius: 11px;padding: 11px;">
                    <div style="width: 70%;text-align: left;" class="tw-inline-block color-white">
                        <h3 class="color-white" style="line-height: 22px;font-weight: 600;margin-bottom: 8px;">Tasks on Piketplace</h3>
                        <p class="color-white" style="color: #E4E4EA;line-height: 18px;font-weight: 400;">Complete tasks and earn instant rewards</p>
                    </div>
                    <div style="width: 30%;vertical-align: text-bottom;text-align: right;" class="tw-inline-block color-white">
                        <button @click="shareReferralLink" class="btn btn-dark-piketplace-outline tw-inline-block" style="padding: 2px 10px;">
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
                    <div class="tw-inline-block border-piketplace" style="background-color: #fff;border-radius: 10px;margin-bottom: 5px;">
                        <h4 class="color-black font-600" style="margin-left: 20px;font-size: 14px;">
                            {{$t('message.side_menu.shop_orders')}}
                        </h4>
                        <div class="d-flex">
                            <div class="" style="text-align:center;width: 25%;display: inline-block;">
                                <router-link :to="{ name: 'my_store'}" class="external-link icon icon-l rounded-s mb-1 icon-rounded-shape">
                                    <i class="color-piketplace fas fa-window-maximize font-16 align-text-top"></i><br>
                                </router-link>
                                <p class="color-black font-11 text-center opacity-70 mb-2" style="line-height: 11px;">{{$t('message.products')}}</p>
                            </div>
                            <div class="" style="text-align:center;width: 25%;display: inline-block;">
                                <router-link :to="{ name: 'my_sales'}" class="external-link icon icon-l rounded-s mb-1 icon-rounded-shape">
                                    <i class="color-piketplace fas fa-shopping-basket font-16 align-text-top"></i><br>
                                </router-link>
                                <p class="color-black font-11 text-center opacity-70 mb-2" style="line-height: 11px;">{{$t('message.side_menu.sales')}}</p>
                            </div>
                            <div class="" style="text-align:center;width: 25%;display: inline-block;">
                                <router-link :to="{ name: 'my_orders'}" class="external-link icon icon-l rounded-s mb-1 icon-rounded-shape">
                                    <i class="color-piketplace fas fa-list-alt font-16 align-text-top"></i><br>
                                </router-link>
                                <p class="color-black font-11 text-center opacity-70 mb-2" style="line-height: 11px;">{{$t('message.orders')}}</p>
                            </div>
                            <div class="" style="text-align:center;width: 25%;display: inline-block;">
                                <router-link :to="{ name: 'my_shipping_apply'}" class="external-link icon icon-l rounded-s mb-1 icon-rounded-shape">
                                    <i class="color-piketplace fas fa-shipping-fast font-16 align-text-top"></i><br>
                                </router-link>
                                <p class="color-black font-11 text-center opacity-70 mb-2" style="line-height: 11px;">{{$t('message.side_menu.shipping_applications')}}</p>
                            </div>
                        </div>
                        <div class="d-flex">
                            <div class="" style="text-align:center;width: 25%;display: inline-block;">
                                <router-link :to="{ name: 'message-contacts'}" class="external-link icon icon-l rounded-s mb-1 icon-rounded-shape">
                                    <i class="color-piketplace fas fa-message font-16 align-text-top"></i><br>
                                </router-link>
                                <span v-if="nb_messages>0" class="message-badge" :class="[nb_messages>10?'lg-content':'m-content']" style="">{{nb_messages}}</span>
                                <p class="color-black font-11 text-center opacity-70 mb-2" style="line-height: 11px;">{{$t('message.messages')}}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row mb-4" style="background-color: #fff;border-radius: 10px;margin-bottom: 5px;">
                    <div class="tw-inline-block border-piketplace" style="background-color: #fff;border-radius: 10px;margin-bottom: 5px;">
                        <h4 class="color-black font-600" style="margin-left: 20px;font-size: 14px;">{{$t('message.side_menu.services_info')}}</h4>
                        <div class="d-flex">
                            <div class="" style="text-align:center;width: 20%;display: inline-block;">
                                <a @click="support_func" class="external-link icon icon-l rounded-s mb-1 icon-rounded-shape"><i class="fa fa-headphones font-16 color-piketplace align-text-top"></i><br></a>
                                <p class="color-black font-11 text-center opacity-70 mb-2" style="line-height: 11px;">{{$t('message.side_menu.support')}}</p>
                            </div>
                            <div class="" style="text-align:center;width: 20%;display: inline-block;">
                                <router-link :to="{ name: 'info'}" class="external-link icon icon-l rounded-s mb-1 icon-rounded-shape">
                                    <i class="fas fa-info-circle font-16  color-piketplace align-text-top"></i><br>
                                </router-link>
                                <p class="color-black font-11 text-center opacity-70 mb-2" style="line-height: 11px;">{{$t('message.side_menu.terms_and_conditions')}}</p>
                            </div>
                            <div class="" style="text-align:center;width: 20%;display: inline-block;">
                                <router-link :to="{ name: 'faq'}" class="external-link icon icon-l rounded-s mb-1 icon-rounded-shape">
                                    <span class="fa-stack fa-lg align-text-top">
                                      <i class="fa fa-comment-o fa-stack-2x color-piketplace"></i>
                                      <i class="fa fa-question fa-stack-1x color-piketplace font-10 align-middle"></i>
                                    </span>
                                </router-link>
                                <p class="color-black font-11 text-center opacity-70 mb-2" style="line-height: 11px;">Q&A</p>
                            </div>
                            <div class="" style="text-align:center;width: 20%;display: inline-block;">
                                <router-link :to="{ name: 'partnership'}" class="external-link icon icon-l rounded-s mb-1 icon-rounded-shape">
                                    <i class="fas fa-handshake-o font-16  color-piketplace align-text-top"></i><br>
                                </router-link>
                                <p class="color-black font-11 text-center opacity-70 mb-2" style="line-height: 11px;">{{$t('message.partnerships')}}</p>
                            </div>
                            <!-- <div v-if="1" class="" style="text-align:center;width: 20%;display: inline-block;">
                                <router-link :to="{ name: 'ads-earnings'}" class="external-link icon icon-l rounded-s mb-1 icon-rounded-shape">
                                    <i class="fas fa-ad font-16  color-piketplace align-text-top"></i><br>
                                </router-link>
                                <p class="color-black font-11 text-center opacity-70 mb-2" style="line-height: 11px;">{{$t('message.ads_earnings')}}</p>
                            </div> -->
                            <div class="" style="text-align:center;width: 20%;display: inline-block;">
                                <a href="https://mainnet.piketplace.com/piads" target="_blank" class="external-link icon icon-l rounded-s mb-1 icon-rounded-shape">
                                    <i class="fas fa-ad font-16  color-piketplace align-text-top"></i><br>
                                </a>
                                <p class="color-black font-11 text-center opacity-70 mb-2" style="line-height: 11px;">{{$t('message.ads_earnings')}}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="user && user.is_partner === true" class="row mb-4" style="background-color: #fff;border-radius: 10px;margin-bottom: 5px;">
                    <div class="tw-inline-block border-piketplace" style="background-color: #fff;border-radius: 10px;margin-bottom: 5px;">
                        <h4 class="color-black font-600" style="margin-left: 20px;font-size: 14px;">{{$t('message.side_menu.country_representative')}}</h4>
                        <div class="d-flex">
                            <div class="" style="text-align:center;width: 25%;display: inline-block;">
                                <router-link :to="{ name: 'partner-account'}" class="external-link icon icon-l rounded-s mb-1 icon-rounded-shape">
                                    <i class="color-piketplace fas fa-user font-16 align-text-top"></i><br>
                                </router-link>
                                <p class="color-black font-11 text-center opacity-70 mb-2" style="line-height: 11px;">{{$t('message.side_menu.account')}}</p>
                            </div>
                            <div class="" style="text-align:center;width: 25%;display: inline-block;">
                                <router-link :to="{ name: 'partner-orders'}" class="external-link icon icon-l rounded-s mb-1 icon-rounded-shape">
                                    <i class="color-piketplace fas fa-list-alt font-16 align-text-top"></i><br>
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
                                <i class="fas fa-donate font-16 color-piketplace align-text-top"></i><br>
                            </router-link>
                            <p class="color-black font-11 text-center opacity-70 mb-2" style="line-height: 11px;">{{$t('message.side_menu.donate')}}</p>
                        </div>
                        <div class="" style="text-align:center;width: 25%;display: inline-block;">
                            <router-link :to="{ name: 'mining'}" class="external-link icon icon-l rounded-s mb-1 icon-rounded-shape">
                                <i class="fas fa-industry font-16 color-piketplace align-text-top"></i><br>
                            </router-link>
                            <p class="color-black font-11 text-center opacity-70 mb-2" style="line-height: 11px;">{{$t('message.side_menu.mining')}}</p>
                        </div>
                        <div class="" style="text-align:center;width: 25%;display: inline-block;">
                            <a @click="open_language_select" class="external-link icon icon-l rounded-s mb-1 icon-rounded-shape">
                                <i class="fa fa-language font-16 color-piketplace align-text-top"></i><br>
                            </a>
                            <p class="color-black font-11 text-center opacity-70 mb-2" style="line-height: 11px;">{{$t('message.side_menu.language')}}</p>
                        </div>
                        <div class="" style="text-align:center;width: 25%;display: inline-block;">
                            <router-link :to="{ name: 'my-addresses'}" class="external-link icon icon-l rounded-s mb-1 icon-rounded-shape">
                                <i class="fas fa-address-card-o font-16 color-piketplace align-text-top"></i><br>
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
        <div  v-if="!isLoggedIn" style="position: absolute;top: 0;left: 0;width: 100%;height: 100%;background-color: rgba(255,255,255,0.9);text-align: center;">
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
                            <i class="fa fa-language color-piketplace font-18"></i>
                            <!-- <span>{{$t('message.side_menu.language')}}</span> -->
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
        },
        methods:{
            ...mapActions(useStore, ['login', 'signOut', 'clearCache', 'showPiAdsRewarded', 'showPiAdsInterstitial', 'setBalance', 'initLoaders']),
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
                this.$hide_modal.hide_modal('menu-main');
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
            }
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