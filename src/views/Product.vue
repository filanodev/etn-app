<template>
    <div class="page-content">
        <Header ref="header" pageTitle="message.product.details" :hide_settings_icon="true"/>
        <SendComment/>
        <AdSense v-if="activate_google_ads"/>
        <ChooseWallet @payPiketplace="pay_piketplace_wallet" @payPinetwork="pay_pi_network_wallet" />
        <Reasons @updateReasons="updateReasons"/>
        <AddStock @add_stock_send_request="add_stock_send_request"/>
        <div v-if="!isLoading && product && (isOwner || !product_unavailable)">
            <!-- <div id="preloader"><div class="spinner-border color-piketplace" role="status"></div></div> -->
            <div style="margin: 5px;padding: 5px;">
                <i v-can="'validate_products'" v-if="product.status!='rejected'" class="fa fa-trash-o color-red-dark cursor-pointer tw:align-middle" @click="validation_status='rejected';validate_product(product.id)" style="font-size: 18px;">&nbsp; Rejeter produits</i>
                <i v-can="'validate_products'" v-if="product.status!='validated'" class="fa fa-check color-green-dark cursor-pointer tw:align-middle" @click="validation_status='validated';validate_product(product.id)" style="font-size: 18px;">&nbsp; Valider produits</i>
                <i v-can="'validate_products'" v-if="product.user" class="" style="font-size: 18px;">{{product.user.phone_code+' '+product.user.phone_number}}</i>
            </div>
            <div v-if="isOwner" style="margin: 5px;padding: 5px;">
                <i class="fa ms-1 me-1 font-14" :class="[product.visible?'fa-eye-slash':'fa-eye']" @click="update_product_visibility_conf">
                    <span class="font-11 ms-1">
                        {{$t('message.'+(product.visible?'hide':'display'))}}
                    </span>
                </i>
                <i v-if="update_active" class="fa fa-edit font-14 color-green-dark ms-1 me-1" @click="updateProduct"><span class="font-11 ms-1">{{$t('message.update_product')}}</span></i>
                <i v-if="deletion_active" class="fa fa-trash font-14 color-red-dark ms-1 me-1" @click="deleteProduct"><span class="font-11 ms-1">{{$t('message.delete')}}</span></i>
                <i class="fa fa-rocket font-14 color-blue-dark ms-1 me-1" @click="show_boost_panel=true"><span class="font-11 ms-1">{{$t('message.boost')}}</span></i>
                <i class="fa fa-plus font-14 color-orange-dark ms-1 me-1" @click="show_add_stock()"><span class="font-11 ms-1">{{$t('message.update_the_stock')}}</span></i>
            </div>
            <div class="card card-style" v-if="isOwner && product.status=='rejected'">
                <div class="content mb-0">
                    <h2>{{$t('message.product_rejected_for_reasons')}}</h2>
                    <ul class="card" v-if="reasons[$i18n.locale]" style="list-style-type: disc;">
                        <li v-for="reason in product.last_validation.reasons">
                            {{reasons[$i18n.locale][reasons[$i18n.locale].findIndex((x) => x.code === reason)].text}}
                        </li>
                    </ul>
                </div>
                <div class="mb-2" style="text-align: center;">
                    <router-link class="btn btn-m font-600 rounded-s shadow-l btn-dark-piketplace" :to="{ name: 'product-update', params: { id: product.id } }" style="margin-right: 1px;margin-top: 5px;">{{$t('message.update_product')}}</router-link>
                
                    <!-- <a v-if="isOwner && product.status=='rejected' && !product.validation_product_updated_at" @click="submit_for_review()" class="btn btn-m font-600 rounded-s shadow-l btn-dark-piketplace-outline" style="margin-top: 5px;">{{$t('message.submit_for_review')}}</a> -->
                </div>
            </div>
            <div class="card card-style" v-if="isOwner && show_boost_panel">
                <div class="accordion" id="accordion-1">
                    <div class="mb-0">
                        <button class="btn accordion-btn no-effect color-theme collapsed" data-bs-toggle="collapse" data-bs-target="#collapse2" aria-expanded="false">
                            <div class="content" style="display: inline-block;margin: 0;">
                                <p class="color-piketplace font-600 mb-1">{{$t('message.boost')}} <i class="fa fa-rocket"></i> </p>
                            </div>
                            <i class="fa fa-chevron-down font-10 accordion-icon"></i>
                        </button>
                        <div id="collapse2" class="collapse show" data-bs-parent="#accordion-1" style="">
                            <div class="pt-1 pb-2 ps-3 pe-3">
                                <div class="content mt-0" v-if="!is_upgrade && already_boosted && product.last_boost">
                                    <h2 class="font-14 color-piketplace tw:text-center">{{$t('message.boost_for_on', {amount: $functions.amount_format(product.last_boost.amount, product.last_boost.currencies_code), period: $t('message.'+product.last_boost.period)})}} <div @click="is_upgrade=true" class="btn btn-dark-piketplace" style="display: inline;width: 45px;">
                                        <i @click="is_upgrade=true" class="fa fa-edit" style=""></i>
                                    </div></h2>
                                    <em class="font-11 color-piketplace">{{$t('message.expires_on', {date: $filters.formatDate(product.last_boost.boost_ends_at, $i18n.locale)})}}</em>
                                    <h3><i class="fa fa-globe"></i> {{$t('message.global_display_position')}}</h3>
                                    <BoostPositionPreview :product="product" :position="global_position"/>
                                    <h3>{{$functions.isoToEmoji(product.country_code)}} {{$t('message.country_display_position')}}</h3>
                                    <BoostPositionPreview :product="product" :position="country_position"/>
                                </div>
                                <form v-else-if="!is_upgrade" class="content mb-0" id="produit-form">
                                    <div class="input-style has-borders validate-field mb-4" style="width: 49%;display: inline-block;">
                                        <input type="text" inputmode="decimal" class="form-control validate-name" id="form1" :placeholder="$t('message.donate.amount')" v-model="form.amount" maxlength="40">
                                        <label for="form1" class="color-piketplace">{{ $t('message.donate.amount') }}</label>
                                        <i class="fa fa-times disabled invalid color-red-dark"></i>
                                        <i class="fa fa-check disabled valid color-green-dark"></i>
                                        <div id="required-fee" style="color: red;display: none;">{{ $t('message.required.fee') }}</div>
                                        <div id="type-fee" style="color: red;display: none;">{{ $t('message.type.fee') }}</div>
                                    </div>
                                    <div class="input-style has-borders no-icon mb-4 input-style-active" style="width: 49%;display: inline-block;">
                                        <label for="form5" class="color-piketplace" style="border-radius: 5px;">{{$t('message.select')}}</label>
                                        <select id="form5" v-model="form.currencies_code">
                                            <option value="default" disabled="" selected="">Select</option>
                                            <option value="pi">Pi</option>
                                            <option value="piket">Piket</option>
                                        </select>
                                        <div id="required-period" style="color: red;display: none;">{{ $t('message.required.period') }}</div>
                                        <span class="disabled"><i class="fa fa-chevron-down"></i></span>
                                    </div>
                                    <div class="input-style has-borders no-icon input-style-active">
                                        <label for="form5" class="color-piketplace" style="border-radius: 5px;">{{$t('message.select')}}</label>
                                        <select id="form5" v-model="form.period">
                                            <option value="default" disabled="" selected="">Select</option>
                                            <option v-for="bp in boost_periods" :value="bp.id">{{$t('message.'+bp.id)}}</option>
                                        </select>
                                        <div id="required-period" style="color: red;display: none;">{{ $t('message.required.period') }}</div>
                                        <span class="disabled"><i class="fa fa-chevron-down"></i></span>
                                    </div>
                                    <div v-if="boost_checked && global_position>0 && country_position>0" class="content">
                                        <h3><i class="fa fa-globe"></i> {{$t('message.global_display_position')}}</h3>
                                        <BoostPositionPreview :product="product" :position="global_position"/>
                                        <h3>{{$functions.isoToEmoji(product.country_code)}} {{$t('message.country_display_position')}}</h3>
                                        <BoostPositionPreview :product="product" :position="country_position"/>
                                    </div>
                                    <div class="color-red-dark" v-if="product.status=='pending'">
                                        <i class="fa fa-warning" style="color: #bdbd25;"></i>
                                        {{$t('message.product_pending')}}
                                    </div>
                                    <div class="color-red-dark" v-if="product.status=='rejected'">
                                        <i class="fa fa-warning" style="color: #bdbd25;"></i>
                                        {{$t('message.product_rejected')}}
                                    </div>
                                    <div class="color-red-dark" v-if="!product.visible"><i class="fa fa-warning" style="color: #bdbd25;"></i>
                                        {{$t('message.product_is_hidden')}}
                                    </div>
                                    <div class="color-red-dark" v-if="!product.is_digital && product.quantity==0">
                                        <i class="fa fa-warning" style="color: #bdbd25;"></i>
                                        {{$t('message.no_stock_for_product')}}
                                    </div>
                                    <div @click="boostProduct('check')"
                                    class="btn btn-3d btn-m btn-full mb-3 rounded-xl text-uppercase font-900 shadow-s btn-dark-piketplace-outline" style="margin-top: 20px;">
                                        {{$t('message.check')}}
                                    </div>
                                    <div v-if="boost_checked===true" @click="pay_with()"
                                    class="btn btn-3d btn-m btn-full mb-3 rounded-xl text-uppercase font-900 shadow-s btn-dark-piketplace" style="margin-top: 20px;">
                                        {{$t('message.continue')}}
                                    </div>
                                </form>
                                <form v-if="is_upgrade" class="content mb-0" id="produit-form">
                                    <h2 class="font-14 color-piketplace text-center mb-3">{{$t('message.boost_upgrade')}}</h2>
                                    <div class="input-style has-borders validate-field mb-2" style="width: 49%;display: inline-block;">
                                        <input type="text" inputmode="decimal" class="form-control validate-name" id="form1" :placeholder="$t('message.donate.amount')" v-model="form.amount" maxlength="40">
                                        <label for="form1" class="color-piketplace">{{ $t('message.donate.amount') }}</label>
                                        <i class="fa fa-times disabled invalid color-red-dark"></i>
                                        <i class="fa fa-check disabled valid color-green-dark"></i>
                                        <div id="required-fee" style="color: red;display: none;">{{ $t('message.required.fee') }}</div>
                                        <div id="type-fee" style="color: red;display: none;">{{ $t('message.type.fee') }}</div>
                                    </div>
                                    <div class="input-style has-borders no-icon mb-2 input-style-active" style="width: 49%;display: inline-block;">
                                        <label for="form5" class="color-piketplace" style="border-radius: 5px;">{{$t('message.select')}}</label>
                                        <select id="form5" v-model="form.currencies_code">
                                            <option value="default" disabled="" selected="">Select</option>
                                            <option value="pi">Pi</option>
                                            <option value="piket">Piket</option>
                                        </select>
                                        <div id="required-period" style="color: red;display: none;">{{ $t('message.required.period') }}</div>
                                        <span class="disabled"><i class="fa fa-chevron-down"></i></span>
                                    </div>
                                    <div v-if="boost_checked && upgrade_positions.global>0 && upgrade_positions.country>0" class="content">
                                        <h3><i class="fa fa-globe"></i> {{$t('message.global_display_position')}}</h3>
                                        <BoostPositionPreview :product="product" :position="upgrade_positions.global"/>
                                        <h3>{{$functions.isoToEmoji(product.country_code)}} {{$t('message.country_display_position')}}</h3>
                                        <BoostPositionPreview :product="product" :position="upgrade_positions.country"/>
                                    </div>
                                    <div>
                                        <div @click="is_upgrade=false"
                                        class="btn btn-3d btn-m btn-full mb-3 rounded-xl text-uppercase font-900 shadow-s btn-dark-piketplace-outline" style="width: 50%;display: inline-block;">
                                            {{$t('message.cancel')}}
                                        </div>
                                        <div @click="upgradeBoostProduct('check')"
                                        class="btn btn-3d btn-m btn-full mb-3 rounded-xl text-uppercase font-900 shadow-s btn-dark-piketplace-outline" style="width: 50%;display: inline-block;">
                                            {{$t('message.check')}}
                                        </div>
                                    </div>
                                    <div v-if="boost_checked===true" @click="pay_with()"
                                    class="btn btn-3d btn-m btn-full mb-3 rounded-xl text-uppercase font-900 shadow-s btn-dark-piketplace" style="margin-top: 20px;">
                                        {{$t('message.continue')}}
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="product.imageFirst != undefined" class="card card-style" data-card-height="300" style="margin: 0 10px 30px;">
                <img :src="product.imageFirst" style="height: auto;">
            </div>
            <div class="" style="display: flex;justify-content: center;">
                <div class="card card-overflow card-style" :class="isOwner && approbation_active?'ribbon':''" style="margin-top: -62px;z-index: 0;width: 100%;">
                    <div class="card__containerrr">
                        <h5 @click="$router.push({ name: 'store', params: { shop_user_id: product.user.id } })" class="mb-0 font-13 font-400" style="float: right;">
                            <img :src="product.user.avatar" :alt="product.libelle" class="tw:inline" style="width: 20px;height: 20px;border-radius: 50%;object-fit: cover;">
                            {{product.user.shopNameShow}}
                            {{show_country?$functions.isoToEmoji(product.country_code):''}}
                            <!-- <i style="color: #790069;" class="fas fa-store"></i> -->
                        </h5>
                        <h1 class="mb-0 pb-0 font-600 font-20" style="line-height: 20px;">{{product.libelle}}</h1>
                        <p class="mb-2 opacity-70">{{product.description}}</p>
                        <div class="d-flex">
                            <div class="me-auto align-self-center">
                                <Amount :amount="product.price" class="font-900 tw:inline"/><!-- 
                                <h2 class="pt-1 me-3 font-700">{{$currency}}{{ product.price_str.split(".")[0]}}<sup class="font-300 font-16">.{{ product.price_str.split(".")[1]}}</sup></h2> -->
                                <!-- <p class="font-400 font-10 mt-n2 opacity-50">VAT not Included</p> -->
                            </div>
                            <div class="align-self-center">
                                <a data-menu="menu-heart" class="icon icon-xs bg-white shadow-xl color-red-dark rounded-xl"><i class="fa fa-star color-yellow-dark"></i></a>
                                <a class="icon icon-xs bg-white shadow-xl color-piketplace rounded-xl ms-1" @click="preComment(product.id)">
                                    <i class="fa fa-comment"></i>
                                </a>
                                <a class="icon icon-xs bg-white shadow-xl color-piketplace rounded-xl ms-1" @click="shareProduct()">
                                    <i class="fa fa-share-alt"></i>
                                </a>
                            </div>
                        </div>
                        <div class="divider mt-1" style="margin: 10px auto;"></div>
                        <span v-if="!product.is_digital" class="font-10" :dir="$i18n.locale=='ar'?'rtl':'ltr'" style="color: rgb(223, 166, 49);">
                            <i v-if="!product.is_digital && product.quantity==0" class="fa fa-warning color-red-dark me-1" style=""></i>{{$t('message.publishForm.instock', {quantity: product.quantity})}}
                            <span v-if="isOwner && !product.is_digital && product.quantity==0" @click="show_add_stock" class="btn btn-dark-piketplace font-10 ms-1" style="padding: 3px 5px;">
                                <i class="fa fa-plus" style=""></i>
                            </span>
                        </span>
                        <div v-if="!product.is_digital" class="row mb-0">
                            <div class="col-4 tw:pr-[0!important]">
                                <div class="input-style has-borders no-icon input-style-always-active validate-field mb-4" style="margin-top: 5px;">
                                    <input type="number" class="form-control validate-number" id="quantity" v-model="qty">
                                    <label for="form1" class="color-piketplace font-500">{{$t('message.product.qty')}}</label>
                                    <i class="fa fa-times disabled invalid color-red-dark"></i>
                                    <i class="fa fa-check disabled valid color-green-dark"></i>
                                </div>
                            </div>
                            <div class="col-8 tw:pr-[0!important]">
                                <a class="btn btn-m font-600 rounded-s shadow-l btn-dark-piketplace" @click="axios_adding()" style="margin-right: 2px;margin-top: 5px;">{{$t('message.product.add')}}<svg class="tw:inline" width="15px" height="15px" viewBox="-0.5 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M18.5996 21.57C19.7042 21.57 20.5996 20.6746 20.5996 19.57C20.5996 18.4654 19.7042 17.57 18.5996 17.57C17.495 17.57 16.5996 18.4654 16.5996 19.57C16.5996 20.6746 17.495 21.57 18.5996 21.57Z" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M8.59961 21.57C9.70418 21.57 10.5996 20.6746 10.5996 19.57C10.5996 18.4654 9.70418 17.57 8.59961 17.57C7.49504 17.57 6.59961 18.4654 6.59961 19.57C6.59961 20.6746 7.49504 21.57 8.59961 21.57Z" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M2 3.55997C2 3.55997 6.64 3.49997 6 7.55997L5.31006 11.62C5.20774 12.1068 5.21778 12.6105 5.33954 13.0929C5.46129 13.5752 5.69152 14.0234 6.01263 14.4034C6.33375 14.7833 6.73733 15.0849 7.19263 15.2854C7.64793 15.4858 8.14294 15.5797 8.64001 15.56H16.64C17.7479 15.5271 18.8119 15.1196 19.6583 14.404C20.5046 13.6884 21.0834 12.7069 21.3 11.62L21.9901 7.50998C22.0993 7.0177 22.0939 6.50689 21.9744 6.017C21.8548 5.52712 21.6242 5.07126 21.3005 4.68467C20.9767 4.29807 20.5684 3.99107 20.1071 3.78739C19.6458 3.58371 19.1438 3.48881 18.64 3.50998H9.94" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg></a>
                                <a @click="is_buy_now=true;axios_adding()" class="btn btn-m font-600 rounded-s shadow-l btn-dark-piketplace-outline" style="margin-top: 5px;">{{$t('message.product.buy_now')}}</a>
                            </div>
                        </div>
                        <div v-else class="row mb-0">
                            <div class="col-8 tw:pl-[0!important]">
                                <div class="input-style has-borders no-icon input-style-always-active validate-field mb-4">
                                    <input type="text" class="form-control validate-number" id="email" v-model="email" placeholder="Eg. test@test.com">
                                    <label for="email" class="color-piketplace font-500">E-mail</label>
                                    <i class="fa fa-times disabled invalid color-red-dark"></i>
                                    <i class="fa fa-check disabled valid color-green-dark"></i>
                                </div>
                            </div>
                            <div class="col-4 tw:p-[0!important]">
                                <a @click="is_buy_now=true;axios_adding()" class="btn btn-m font-600 rounded-s shadow-l btn-dark-piketplace">{{$t('message.product.buy_now')}}</a>
                            </div>
                        </div>
                        <div class="divider m-1"></div>
                        <div class="d-flex mt-3">
                            <div class="flex-grow-1">
                                <span class="font-11">{{$t('message.product.ratings_comments')}}</span>
                                <p class="mb-2">
                                <strong class="color-theme">4.9</strong>
                                <i class="fa fa-star color-yellow-dark ps-2"></i>
                                <i class="fa fa-star color-yellow-dark"></i>
                                <i class="fa fa-star color-yellow-dark"></i>
                                <i class="fa fa-star color-yellow-dark"></i>
                                <i class="fa fa-star color-yellow-dark"></i>
                                </p>
                            </div>
                            <div class="flex-shrink-1 text-end">
                                <a class="d-block mb-n4 color-piketplace"><i class="fa fa-comment"></i>&nbsp;{{product.comments.length!=0?product.comments.length+' '+$t('message.comments'):$t('message.no_comments')}}</a>
                                <span class="d-block mt-n1 font-9 opacity-60 mt-n2">{{$t('message.product.verified_customers')}}</span>
                            </div>
                        </div>
                        <div v-if="isOwner && approbation_active" class="align-self-right ribbon" style="text-align: right;">
                            {{$t('message.product_'+product.status)}}
                        </div>
                    </div>
                </div>
            </div>
            <div class="card card-style" v-if="!product.is_digital && (product.shipping_zone.length>0 || product.free_shipping)">
                <div v-if="product.shipping_zone.length>0" class="accordion" id="accordion-1">
                    <div class="mb-0">
                        <button class="btn accordion-btn no-effect color-theme collapsed" data-bs-toggle="collapse" data-bs-target="#sales_panel" aria-expanded="false" style="padding-bottom: 0;">
                            <div class="content tw:inline-block" style="margin: 0;">
                                <h2>{{$t('message.shipping_zones_and_fees')}}</h2>
                            </div>
                            <i class="fa fa-chevron-down font-10 accordion-icon"></i>
                        </button>
                        <div id="sales_panel" class="collapse show" data-bs-parent="#accordion-1" style="">
                            <div class="pt-1 pb-1 ps-3 pe-3">
                                <div class="content mt-0 mb-1">
                                    <div v-for="zone, index in product.shipping_zone" class="vcard-field" style="line-height: 24px;padding-top: 15px;">
                                      <strong class="font-600 color-black">{{zone.country_name}}, {{zone.city?zone.city:$t('message.everywhere_in_country')}}</strong>
                                      <a><span v-if="zone.city">{{zone.zone?zone.zone:(zone.city?zone.city:zone.country_name)}}<br></span><span v-if="zone.fee!=''">{{$t('message.shipping_cost',{'amount': $functions.amount_format(zone.fee, $currency)})}}</span><span v-else>{{$t('message.no_defined_shipping_cost')}}</span></a>
                                      <svg class="tw:inline tw:absolute tw:right-[0!important] tw:opacity-100" width="11px" height="11px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M16.5264 5.06211C19.1917 7.81864 19.1917 12.2636 16.5264 15.0201L11.7002 20.0001L6.87393 15.0211C4.20869 12.2646 4.20869 7.81964 6.87393 5.06311C8.15004 3.74291 9.88743 3.00019 11.7 3C13.5125 2.99981 15.2501 3.74218 16.5264 5.06211Z" stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M14.4301 9.61108C14.4124 11.153 13.1824 12.3901 11.679 12.378C10.1755 12.3659 8.96452 11.1093 8.97036 9.56721C8.9762 8.02514 10.1966 6.77818 11.7001 6.77808C13.2167 6.78744 14.4388 8.05567 14.4301 9.61108Z" stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="product.free_shipping" class="accordion" id="accordion-1">
                    <div class="mb-0">
                        <button class="btn accordion-btn no-effect color-theme collapsed pt-0 pb-0" data-bs-toggle="collapse" data-bs-target="#sales_panel" aria-expanded="false">
                            <div class="content" style="display: inline-block;margin: 0;">
                                <h2>{{$t('message.free_shipping_zones')}}</h2>
                            </div>
                            <i v-if="product.shipping_zone.length==0 && product.free_shipping" class="fa fa-chevron-down font-10 accordion-icon"></i>
                        </button>
                        <div id="sales_panel" class="collapse show" data-bs-parent="#accordion-1" style="">
                            <div class="pt-1 pb-2 ps-3 pe-3">
                                <div class="content mt-0 mb-2">
                                    <div v-for="zone, index in product.free_shipping_zone" class="vcard-field" style="line-height: 35px;padding-top: 15px;">
                                      <strong class="font-600 color-black">{{zone.country_name}}, {{zone.city?zone.city:$t('message.everywhere_in_country')}}</strong>
                                      <a v-if="zone.city">{{zone.zone?zone.zone:(zone.city?zone.city:zone.country_name)}}</a>
                                      <a v-else>{{$t('message.everywhere_in_country')}}</a>
                                      <svg class="tw:inline tw:absolute tw:right-[0!important] tw:opacity-100" width="11px" height="11px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M16.5264 5.06211C19.1917 7.81864 19.1917 12.2636 16.5264 15.0201L11.7002 20.0001L6.87393 15.0211C4.20869 12.2646 4.20869 7.81964 6.87393 5.06311C8.15004 3.74291 9.88743 3.00019 11.7 3C13.5125 2.99981 15.2501 3.74218 16.5264 5.06211Z" stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M14.4301 9.61108C14.4124 11.153 13.1824 12.3901 11.679 12.378C10.1755 12.3659 8.96452 11.1093 8.97036 9.56721C8.9762 8.02514 10.1966 6.77818 11.7001 6.77808C13.2167 6.78744 14.4388 8.05567 14.4301 9.61108Z" stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card card-style" v-if="product.imageFirst != undefined && product.images.length > 1">
                <div class="content mb-0">
                    <p class="color-piketplace font-600 mb-1">{{$t('message.product.view_in_detail')}} {{product.images.length}}</p>
                    <h2>{{$t('message.product.product_gallery')}}</h2>
                    <div class="card card-style bg-18 mx-0" data-card-height="300" v-for="image in product.images">
                        <img :src="image.lien" style="height: auto;">
                    </div>
                </div>
            </div>
            <div class="card card-style" v-if="product && product.comments.length > 0">
                <div class="accordion" id="accordion-1">
                    <div class="mb-0">
                        <button class="btn accordion-btn no-effect color-theme collapsed pb-1" data-bs-toggle="collapse" data-bs-target="#collapse2" aria-expanded="false">
                            <div class="content" style="display: inline-block;margin: 0;">
                                <p class="color-piketplace font-600 mb-1">{{$t('message.product.what_pioneers_say')}} </p>
                                <h2>{{$t('message.product.product_comments')}}</h2>
                                
                            </div>
                            <i class="fa fa-chevron-down font-10 accordion-icon"></i>
                        </button>
                        <div id="collapse2" class="collapse show" data-bs-parent="#accordion-1" style="">
                            <div class="pt-1 pb-2 ps-3 pe-3">
                                <div class="content" v-for="comment in product.comments" style="margin:0;">
                                    <div class="mb-2" v-if="comment && comment.user" style="line-height: 14px;">
                                        <div class="d-flex">
                                            <div>
                                                <h6 class="font-14 text-end tw:inline font-600" style="">@{{comment.user.username}}</h6>&nbsp;
                                                <span class="font-10 mb-0 mt-n2 opacity-40 text-end">{{$filters.formatDate(comment.created_at, $i18n.locale)}}</span>
                                            </div>
                                        </div>
                                        <p class="mt-3" style="margin-top: 0!important;">
                                        {{comment.comment}}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else-if="isLoading" style="text-align: center;">
            <img style="width: 70px;margin: auto;" src="/site_images/index_loader.gif" class="rounded-sm img-fluid">{{$t('message.loading')}}
        </div>
    </div>
</template>

<script>
    import axios from "axios";
    import AdSense from '../components/AdSense.vue'
    import Reasons from '../components/Reasons.vue'
    import ChooseWallet from '../components/ChooseWallet.vue';
    import BoostPositionPreview from '../components/BoostPositionPreview.vue';

    import { v4 as uuidv4 } from 'uuid';

    import { mapState, mapWritableState, mapActions } from 'pinia'
    import { useStore } from '../stores'

    export default {
        components: {
            AdSense, Reasons, ChooseWallet, BoostPositionPreview
        },
        data: () => ({
            isLoading: false,
            not_found: false,
            is_buy_now: false,
            isOwner: false,
            /*approbation_active: false,
            deletion_active: false,
            update_active: false,*/
            id: 0,
            //user: null,
            qty: 1,
            in_free_shipping_zone: '',
            take_care_shipping_myself: '',
            prevRoute: null,
            product_status: '',
            validation_status: '',
            validation_data: null,
            //product: null,
            product_unavailable: false,
            //////BOOST VARIABLES
            is_upgrade: false,
            already_boosted: false,
            boost_checked: false,
            global_position: 0,
            country_position: 0,
            upgrade_positions: {
                global: 0,
                country: 0,
            },
            form: {
                amount: "",
                currencies_code: "",
                period: "",
            },
            boost_periods: [],
        }),
        beforeRouteEnter(to, from, next) {
          next(vm => {
            vm.prevRoute = from
          })
        },
        beforeUnmount() {
          this.set_show_boost_panel(false)
          this.setUniqueId('')
          this.clearPaymentVerifier()
        },
        created() {
          this.verifyIfPaymentDone()
        },
        computed: {
            ...mapWritableState(useStore, ['user', 'isLoggedIn', 'show_country', 'purchase_activation', 'saving', 'deleting', 'approbation_active', 'deletion_active', 'update_active', 'connecting', 'disconnecting', 'project_type', 'product', 'activate_google_ads', 'reasons', 'show_boost_panel', 'uniqueId', 'payment_from']),
        },
        mounted() {
            //this.adsenseAddLoad()
            this.id = this.$route.params.id;
            this.initLoaders()
            /*this.saving = false
            this.deleting = false
            this.connecting = false
            this.disconnecting = false*/
            console.log('loaders', this.saving, this.deleting, this.connecting, this.disconnecting)
            console.log('this.purchase_activation', this.purchase_activation)
            if (this.user && this.user.email) {
                this.email = this.user.email
            }
            this.loadProduct();
        },
        methods: {
            ...mapActions(useStore, ['login', 'validate_product_store', 'submit_for_review_store', 'initLoaders', 'set_show_boost_panel', 'piPayment', 'setUniqueId', 'clearPaymentVerifier', 'launchPaymentVerifier', 'set_force_index_refresh']),
            adsenseAddLoad(){
                let inlineScript   = document.createElement("script");
                inlineScript.type  = "text/javascript";
                inlineScript.text  = '(adsbygoogle = window.adsbygoogle || []).push({});'
                document.getElementsByTagName('body')[0].appendChild(inlineScript);
            },
            shareProduct() {
                let product_link = 'https://'+this.project_type.toLowerCase()+'.piketplace.com/#/product/'+this.product.id
                let description = ''
                if (this.product.description) {
                    description = this.product.description.replace(/[\r\n]+/g," ");
                }
                let data = {
                    product_name: this.product.libelle,
                    description: description,
                    product_link: product_link,
                }
                let message = this.$t('message.product_link_message_to_share', data)
                if (this.isOwner) {
                    message = this.$t('message.my_product_link_message_to_share', data)
                }
                let title = this.$t('message.sharing_product_link')
                Pi.openShareDialog(title, message)
            },
            async loadProduct() {
                let self = this
                let id = this.id
                this.isLoading = true
                let url = '/' + id + '/products'
                if (this.isLoggedIn) {
                    url = '/products/' + id
                }
                //alert(url)
                await axios.get(url)
                .then(res => {
                    this.isLoading = false
                    console.log("loadProduct", res.data)
                    //alert(res.data.status+' - '+res.data.message)
                    if (res.data.status) {
                        this.approbation_active = res.data.approbation_active;
                        this.deletion_active = res.data.deletion_active;
                        this.update_active = res.data.update_active;
                        this.product = res.data.product;
                        this.boost_periods = res.data.boost_periods;
                        this.selected_category = this.product.category
                        this.files_uploaded = this.product.images
                        this.product_status = "'"+this.$t('message.product_'+this.product.status)+"'";
                        this.setOwner()
                        console.log("this.product", this.product, this.files_uploaded)
                        if (this.product.last_boost) {
                            this.already_boosted = true
                        }
                        this.setPosition(res.data)
                    }else if(res.data.message && res.data.message=="product_not_validated"){
                        this.product_unavailable = true
                        //alert(res.data.message)
                        this.$functions.msg_box(this, 'info', this.$t("message.info"), this.$t("message.product_unavailable"), '/')
                    }else{

                    }
                })
                .catch(error => {
                    this.isLoading = false
                    this.not_found = true;
                })
            },
            async update_product_visibility_conf(){
                let img = '/site_images/info.PNG'
                let msg = this.$t('message.you_going_display_product')
                if (this.product.visible) {
                    msg = this.$t('message.you_going_hide_product')
                }
                msg = '<br><img class="m-auto" src="'+img+'"><br><strong style="font-size:20px;">'+msg+'<strong>'
                this.$confirm(
                    {
                      message: msg,
                      button: {
                        no: this.$t('message.no'),
                        yes: this.$t('message.yes')
                      },
                      /**
                      * Callback Function
                      * @param {Boolean} confirm
                      */
                      callback: confirm => {
                        if (confirm) {
                            this.update_product_visibility(this.product.id)
                        }
                      }
                    }
                )
            },
            update_product_visibility(product_id, force_hide = false){
                let data = {
                    product_id: product_id,
                    force_hide: force_hide,
                }
                console.log("update_product_visibility", data)
                this.saving = true
                axios.post('/update-product-visibility', data)
                .then(res => {
                    this.saving = false;
                    if (res.data.status === true) {
                        if (res.data.product && res.data.product.visible) {
                            this.$functions.msg_box(this, 'success', this.$t("message.info"), this.$t("message.product_visible_now"))
                        }else{
                            this.$functions.msg_box(this, 'success', this.$t("message.info"), this.$t("message.product_hidden_now"))
                        }
                        this.product = res.data.product
                    }else if(res.data.message == "has_precommand"){
                        let yes = this.$t('message.continue')
                        let btn = {
                            yes: yes,
                            no: this.$t('message.confirmation.no_cancel'),
                        }
                        let img = '/site_images/confirm.PNG'
                        let msg = this.$t('message.this_product_contains_precommands')
                        msg = msg+'<br>'+this.$t('message.cancel_precommands_and_hide')
                        msg = '<br><img class="m-auto" src="'+img+'"><br><strong style="font-size:16px;">'+msg+'<strong>'
                        this.$confirm({
                          title: this.$t('message.info'),
                          message: msg,
                          button: btn,
                          html: true,
                            callback: async confirm => {
                                if (confirm) {
                                    this.update_product_visibility(product_id, true)
                                }
                            }
                        })
                    }else{
                        this.$functions.msg_box(this, 'error', this.$t("message.info"), this.$t("message.an_error_occured"))
                    }
                })
                .catch(function (error) {
                    this.saving = false;
                    this.$functions.msg_box(this, 'error', this.$t("message.info"), this.$t("message.an_error_occured"))
                });
            },
            preComment(id){
                if (!this.isLoggedIn) {
                    //alert('not isLoggedIn '+this.$t("message.log_in_first"))
                    this.$functions.msg_box(this, 'confirm', this.$t("message.connection"), this.$t("message.log_in_first"), 'login')
                    return
                }
                this.$show_modal.show_modal({
                    id:'send-comment'
                });
            },
            axios_adding(){
                if (!this.isLoggedIn) {
                    this.$functions.msg_box(this, 'confirm', this.$t("message.connection"), this.$t("message.log_in_first"), 'login')
                    return
                }
                if (!this.purchase_activation) {
                    this.$functions.msg_box(this, 'error', this.$t("message.info"), this.$t("message.purchase_deactivated"))
                    return
                }
                if (this.product.is_digital && (!this.email || !this.$functions.is_an_email(this.email))) {
                    this.$functions.msg_box(this, 'error', this.$t('message.info'), this.$t('message.email_required_with_format'))
                    return
                }
                //No question if product is digital
                if (this.product.is_digital) {
                    this.$router.push({name: 'cart_buy', params: {id: this.product.id, in_free_shipping_zone: 'true'}});
                    return;
                }
                if (this.is_buy_now) {
                    let in_free_ship_param = "false";
                    if (this.product.free_shipping && this.in_free_shipping_zone == 'yes') {
                        in_free_ship_param = "true";
                    }
                    this.$router.push({name: 'cart_buy', params: {id: this.product.id, in_free_shipping_zone: in_free_ship_param}});
                    return 1;
                }
                let id = this.id;
                let username = this.user.username;
                //let quantity = $('#quantity').val();
                let quantity = this.qty;
                let in_free_shipping_zone = this.in_free_shipping_zone;
                let in_paid_shipping_zone = 'no';
                //alert(quantity);
                this.saving = true
                axios.post('/addToCart', {id:id, username:username, quantity:quantity, in_free_shipping_zone:in_free_shipping_zone, in_paid_shipping_zone:in_paid_shipping_zone}).then(res => {
                    this.saving = false
                    if (res.data.status == 'success') {
                        this.$show_modal.show_modal({id: 'added_to_chart'})
                    }else{
                        this.$functions.msg_box(this, 'error', this.$t("message.info"), this.$t(res.data.message))
                    }
                    
                })
                .catch(function (error) {
                    this.saving = false
                    console.log(error);
                });
            },
            pay(){
                alert('rtgggggg')
                //this.$auth.authenticate();
                //this.$pay.payment('xfds');
            },
            deleteProduct(){
                let title = this.$t('message.suppression')
                let img = '/site_images/confirm.PNG'
                let msg = this.$t('message.confirmation.you_sure')
                msg = '<br><img class="m-auto" src="'+img+'"><br><strong style="font-size:20px;">'+msg+'<strong>'
                this.$confirm(
                    {
                      title: title,
                      message: msg,
                      button: {
                        //yes: 'OK'
                        yes: this.$t('message.yes'),
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
                              this.deleting = true
                              axios.delete('/products/'+this.product.id)
                              .then(res => {
                                this.deleting = false
                                  this.$functions.msg_box(this, 'success', 'Info', this.$t("message.deleted_successfull"), -1)
                              })
                              .catch(error => {
                                  this.deleting = false
                              })
                          }
                        }
                    }
                )
            },
            pay_with(){
                if (this.form.currencies_code=="piket") {
                    this.pay_piketplace_wallet_set_pin_code()
                    return
                }
                this.$show_modal.show_modal({id:'choose-wallet'})
            },
            pay_piketplace_wallet(pin_code){
                //alert(pin_code)
                this.is_upgrade?this.upgradeBoostProduct("continue", pin_code):this.boostProduct("continue", pin_code)
            },
            pay_piketplace_wallet_set_pin_code(){
                this.$confirm({
                  auth: true,
                  message: '<span class="font-900 font-16">'+this.$t('message.put_your_code_pin')+'</span><br><br>'+this.$t('message.create_your_code_pin')+'<i class="fa fa-hand-point-right me-1 ms-1"></i><a class="" style="color: darkblue" href="'+this.piket_wallet_frontend_url+'" target="_blank">Piket Wallet</a><br><br>',
                  button: {
                    yes: this.$t('message.confirmation.yes_continue'),
                    no: this.$t('message.confirmation.no_cancel')
                  },
                  /**
                   * Callback Function
                   * @param {Boolean} confirm
                   * @param {String} password
                   */
                  callback: (confirm, password) => {
                    if (confirm && password) {
                        //alert('transfer start')
                        //this.boostProduct("continue", password)
                        this.is_upgrade?this.upgradeBoostProduct("continue", password):this.boostProduct("continue", password)
                    }
                  }
                })
            },
            pay_pi_network_wallet(){
                //this.uniqueId = uuidv4();
                if (this.uniqueId == '') {
                    this.setUniqueId(uuidv4());
                    this.verifyIfPaymentDone();
                }
                let data = {
                    uniqueId: this.uniqueId,
                    type: 'product_boost_upgrade',
                    memo: this.$t('message.boost_upgrade'),
                    amount: this.form.amount,
                    products_id: this.product.id,
                    userId: this.user.id,
                };
                if (!this.is_upgrade) {
                    data.type = 'product_boost'
                    data.memo = this.$t('message.boost_for_on', {
                        amount: this.$functions.amount_format(this.form.amount, "pi"),
                        period: this.$t("message."+this.form.period),
                    })
                    data.period = this.form.period
                }
                this.piPayment(data)
            },
            setPosition(data){
                if (data.boostPositionCheck) {
                    this.global_position = data.boostPositionCheck.global_position
                    this.country_position = data.boostPositionCheck.country_position
                }else if(data.boostPosition){
                    this.global_position = data.boostPosition.global_position
                    this.country_position = data.boostPosition.country_position
                }
            },
            boostProduct(status, pin_code=""){
                if (!this.$functions.is_decimal_not_zero(this.form.amount)) {
                    this.$functions.msg_box(this, 'error', this.$t('message.info'), this.$t('message.numeric_value_required_for_amount'))
                    return
                }
                if (this.form.currencies_code=="" && this.form.period=="") {
                    this.$functions.msg_box(this, 'error', this.$t('message.info'), this.$t('message.donate.fill_all_fields'))
                    return
                }
                this.saving = true
                this.form.products_id = this.product.id
                this.form.status = status
                this.form.code_pin = pin_code
                console.log('boost-products/ sending', this.form)
                axios.post('/boost-products', this.form)
                .then(res => {
                    this.saving = false
                    console.log('boost-products/', res.data)
                    if (res.data.status) {
                        this.product = res.data.product
                        if (status=="check") {
                            this.boost_checked = true
                            this.setPosition(res.data)
                        }else{
                            this.set_force_index_refresh(true)
                            this.already_boosted = true
                            this.setPosition(res.data)
                            this.$functions.msg_box(this, 'success', 'Info', this.$t("message.boosted_successfully"), '/')
                        }
                    }else if(res.data.message && res.data.message!=""){
                        let data = {}
                        if (res.data.amount_min_required && res.data.currencies_code) {
                            data.amount = this.$functions.amount_format(res.data.amount_min_required, res.data.currencies_code)
                        }
                        this.$functions.msg_box(this, 'error', '', this.$t(res.data.message, data))
                    }else{
                        this.$functions.msg_box(this, 'error', '', this.$t('message.an_error_occured'))
                    }
                })
                .catch(error => {
                    this.saving = false
                    this.$functions.msg_box(this, 'error', '', this.$t('message.an_error_occured'))
                })
            },
            upgradeBoostProduct(status, pin_code=""){
                if (!this.$functions.is_decimal_not_zero(this.form.amount)) {
                    this.$functions.msg_box(this, 'error', this.$t('message.info'), this.$t('message.numeric_value_required_for_amount'))
                    return
                }
                if (this.form.currencies_code=="" && this.form.period=="") {
                    this.$functions.msg_box(this, 'error', this.$t('message.info'), this.$t('message.donate.fill_all_fields'))
                    return
                }
                this.saving = true
                this.form.products_id = this.product.id
                this.form.status = status
                this.form.code_pin = pin_code
                console.log('upgrade-boost-products/ sending', this.form)
                axios.post('/upgrade-boost-products', this.form)
                .then(res => {
                    this.saving = false
                    console.log('upgrade-boost-products/', res.data)
                    if (res.data.status) {
                        this.product = res.data.product
                        if (status=="check") {
                            this.boost_checked = true
                            this.upgrade_positions.global = res.data.boostPositionCheck.global_position
                            this.upgrade_positions.country = res.data.boostPositionCheck.country_position
                        }else{
                            this.set_force_index_refresh(true)
                            this.already_boosted = true
                            this.is_upgrade = false
                            this.setPosition(res.data)
                            this.$functions.msg_box(this, 'success', 'Info', this.$t("message.boost_upgraded_successfully"), '/')
                        }
                    }else if(res.data.message && res.data.message!=""){
                        let data = {}
                        if (res.data.amount_min_required && res.data.currencies_code) {
                            data.amount = this.$functions.amount_format(res.data.amount_min_required, res.data.currencies_code)
                        }
                        this.$functions.msg_box(this, 'error', '', this.$t(res.data.message, data))
                    }else{
                        this.$functions.msg_box(this, 'error', '', this.$t('message.an_error_occured'))
                    }
                })
                .catch(error => {
                    this.saving = false
                    this.$functions.msg_box(this, 'error', '', this.$t('message.an_error_occured'))
                })
            },
            updateProduct() {
                this.$router.push({name: 'product-update', params: {id: this.product.id}})
            },
            show_add_stock() {
                this.$show_modal.show_modal({id:"add-stock"})
            },
            add_stock_send_request(quantity) {
                this.$hide_modal.hide_modal('add-stock')

                this.saving = true
                let data = {
                    products_id: this.product.id,
                    quantity: quantity,
                }
                axios.post('/add-stock', data)
                .then(res => {
                    this.saving = false;
                    if (res.data.status === true) {
                        this.$functions.msg_box(this, 'success', this.$t("message.info"), this.$t("message.stock_added_successfully"))
                        this.product = res.data.product
                    }else{
                        this.$functions.msg_box(this, 'error', this.$t("message.info"), this.$t("message.an_error_occured"))
                    }
                })
                .catch(function (error) {
                    this.saving = false;
                    this.$functions.msg_box(this, 'error', this.$t("message.info"), this.$t("message.an_error_occured"))
                });
            },
            validate_product(id){
                this.validation_data = {
                    id:id,
                    status: this.validation_status,
                    self: this
                }
                if (this.validation_status == 'rejected') {
                    this.$show_modal.show_modal({id: 'reasons'})
                    return
                }
                let img = '/site_images/info.PNG'
                let msg = this.$t('message.confirmation.you_sure')
                msg = '<br><img src="'+img+'"><br><strong style="font-size:20px;">'+msg+'<strong>'
                this.$confirm(
                    {
                      message: msg,
                      button: {
                        no: this.$t('message.no'),
                        yes: this.$t('message.yes')
                      },
                      /**
                      * Callback Function
                      * @param {Boolean} confirm
                      */
                      callback: confirm => {
                        if (confirm) {
                          this.validate_product_store(this.validation_data)
                        }
                      }
                    }
                )
            },
            submit_for_review(){
                let id = product.id
                let img = '/site_images/info.PNG'
                let msg = this.$t('message.confirmation.you_sure')
                msg = '<br><img src="'+img+'"><br><strong style="font-size:20px;">'+msg+'<strong>'
                this.$confirm(
                    {
                      message: msg,
                      button: {
                        no: this.$t('message.no'),
                        yes: this.$t('message.yes')
                      },
                      /**
                      * Callback Function
                      * @param {Boolean} confirm
                      */
                      callback: confirm => {
                        if (confirm) {
                          this.submit_for_review_store({id:id, self: this})
                        }
                      }
                    }
                )
            },
            updateReasons(reasons){
                let tab = []
                reasons.forEach(val=>{
                    if (val.selected) {
                        tab.push(val.code)
                    }
                })
                this.validation_data.reasons = tab
                this.validate_product_store(this.validation_data)
            },
            setOwner(){
                this.isOwner = false
                if (this.isLoggedIn && this.user && this.product && this.user.id==this.product.pi_users_id) {
                    this.isOwner = true
                }
            },
            verifyIfPaymentDone () {
                this.payment_from = this.is_upgrade?"boost_upgrade":"boost";
                //let uniqueId = this.uniqueId;
                let data = {
                    uniqueId: this.uniqueId,
                    self: this,
                }
                this.launchPaymentVerifier(data)
            },
        },
        watch: {
            qty(val, old){

            },
            isLoggedIn(val, old){
                this.setOwner()
            },
            product(val, old){
                this.setOwner()
            },
            locale(val, old){
                this.product_status = "'"+this.$t('message.'+this.product.status)+"'";
            },
            http_request_status(val, old){
                if (val == 'success') {
                    this.product.status = this.validation_status
                }
            },
            session_expired(val, old){
                if (val === false) {
                    this.loadProduct()
                }
            },
            'form.amount': function (newVal, oldVal){
                this.boost_checked = false
                 // Remove any non-numeric characters except the dot
                this.form.amount = this.form.amount.replace(/[^\d.]/g, '');

                // Remove additional dots if more than one
                const dots = this.form.amount.match(/\./g);
                if (dots && dots.length > 1) {
                    this.form.amount = this.form.amount.replace(/\.$/, '');
                }
                //Limit number of digits after dot to 7
                let amountTab = newVal.toString().split('.')
                if (amountTab[1] && amountTab[1].length>7) {
                    this.form.amount = oldVal
                }
            },
            'form.currencies_code': function (newVal, oldVal){
                this.boost_checked = false
            },
            'form.period': function (newVal, oldVal){
                this.boost_checked = false
            },
            payment_from(newVal, oldVal){
                if (newVal === "") {
                    this.loadProduct()
                }
            },
        }
    }
</script>

<style scoped>
    .list-custom-small a.external-link{
        line-height: 30px;
        text-transform: capitalize;
    }
    .card__containerrr{
      /*padding : 2rem;*/
      padding: 20px;
      width: 100%;
      height: 100%;
      background: white;
      border-radius: 1rem;
    }
    .ribbon::before{
      position: absolute;
      content: '';
      background: #a63289;
      height: 28px;
      width: 28px;
      top:1rem;
      right:-0.5rem;
      transform : rotate(45deg);
      z-index: -1;
    }
    .ribbon::after{
      position: absolute;
      content: v-bind(product_status);
      top: -12px;
      right: -14px;
      padding: 0.5rem;
      width: 12rem;
      border-top-left-radius: 5px;
      border-bottom-left-radius: 5px;
      background: #a63289;
      color: white;
      text-align: center;
      font-family: 'Roboto', sans-serif;
      box-shadow: 4px 4px 15px rgba(26, 35, 126, 0.2);
    }
</style>
