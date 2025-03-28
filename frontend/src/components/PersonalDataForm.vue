<script setup>
import { ref } from 'vue'
import { format } from 'date-fns'
const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
})
const editedSection = ref('applicant')
const householdCertificate = ref({
  urls: props.data?.household_certificate_copies_urls || [],
  files: null,
})
const evaluationReport = ref({
  urls: props.data?.joint_evaluation_report_copies_urls || [],
  files: null,
  checked:
    !!props.data?.joint_evaluation_report_copies_urls &&
    props.data?.joint_evaluation_report_copies_urls.length !== 0,
})
const diagnosisCertificate = ref({
  urls: props.data?.diagnosis_certificate_copies_urls || [],
  files: null,
  checked:
    !!props.data?.diagnosis_certificate_copies_urls &&
    props.data?.diagnosis_certificate_copies_urls.length !== 0,
})
const lowIncomeCertificate = ref({
  urls: props.data?.low_income_certificate_copies_urls || [],
  files: null,
  checked:
    !!props.data?.low_income_certificate_copies_urls &&
    props.data?.low_income_certificate_copies_urls.length !== 0,
})
const delaySchoolEntryCertificate = ref({
  urls: props.data?.delayed_school_entry_copies_urls || [],
  files: null,
  checked:
    !!props.data?.delayed_school_entry_copies_urls &&
    props.data?.delayed_school_entry_copies_urls.length !== 0,
})

const disabilityIdentification = ref({
  urls: props.data?.disability_identification_copies_urls || [],
  files: null,
  checked:
    !!props.data?.disability_identification_copies_urls &&
    props.data?.disability_identification_copies_urls.length !== 0,
})

const postalPassbookCover = ref({
  url: props.data?.postal_passbook_cover_copies_urls,
  files: null,
})

const emits = defineEmits([
  'updateApplicant',
  'updateChild',
  'updatePostalBankAccount',
  'updateFile',
])
function judgeIdentity(type) {
  // if (!props.data.child.identities) return false
  return !!props.data.child?.identities?.includes(type)
}
function onUpdateIdentity(newValue, type) {
  const typeArr = [type]
  if (newValue) {
    //某個type被勾選, 把該項加到array
    emits('updateChild', {
      ...props.data.child,
      identities: props.data.child.identities //一開始都沒勾
        ? props.data.child.identities.concat(typeArr)
        : typeArr,
    })
  } else {
    //某個type被取消, 把該項從array去掉
    emits('updateChild', {
      ...props.data.child,
      identities: props.data.child.identities.filter((identity) => identity !== type),
    })
  }
}
</script>

<template>
  <QForm style="min-width: 300px; max-width: 800px; margin: 0 auto" class="personal_data">
    <QCard flat class="my-card">
      <div class="q-pa-md">
        <div class="title">
          <h6>申請人資料</h6>
          <QBtn
            flat
            color="black"
            :icon="editedSection === 'applicant' ? 'expand_more' : 'expand_less'"
            @click="editedSection = editedSection === 'applicant' ? '' : 'applicant'"
          />
        </div>
        <div v-if="editedSection === 'applicant'" class="information_detail">
          <QCardSection>
            <QInput
              outlined
              label="申請人"
              dense
              :model-value="props.data?.applicant.full_name"
              @update:model-value="
                emits('updateApplicant', {
                  ...props.data?.applicant,
                  full_name: $event,
                })
              "
            />
            <QInput
              outlined
              label="與兒童關係"
              dense
              :model-value="props.data?.applicant?.relation_to_child"
              @update:model-value="
                emits('updateApplicant', {
                  ...props.data?.applicant,
                  relation_to_child: $event,
                })
              "
            />
            <QInput
              outlined
              label="聯絡電話"
              dense
              :model-value="props.data?.applicant?.phone"
              @update:model-value="
                emits('updateApplicant', {
                  ...props.data?.applicant,
                  phone: $event,
                })
              "
            />
          </QCardSection>

          <QCardSection>
            <div class="file_upload">
              <QFile
                outlined
                dense
                multiple
                append
                clearable
                :model-value="householdCertificate.files"
                @update:model-value="
                  ($event) => {
                    householdCertificate.files = $event
                    emits('updateFile', {
                      household_certificate_copies: householdCertificate.files,
                    })
                  }
                "
                :label="
                  householdCertificate.urls.length === 0 ? '上傳戶口名簿' : '重新上傳戶口名簿'
                "
              >
                <template v-slot:prepend>
                  <QIcon name="attach_file" />
                </template>
              </QFile>
            </div>
            <div v-if="householdCertificate.urls.length !== 0" class="file_link">
              <span>前次上傳的檔案:</span>
              <a
                v-for="(url, index) in householdCertificate.urls"
                :key="index"
                :href="url"
                target="_blank"
                rel="noopener noreferrer"
              >
                {{ index + 1 }}
              </a>
            </div>
          </QCardSection>
        </div>
      </div>
    </QCard>

    <QCard class="my-card">
      <div class="q-pa-md">
        <div class="title">
          <h6>兒童資料</h6>
          <QBtn
            flat
            color="black"
            :icon="editedSection === 'child' ? 'expand_more' : 'expand_less'"
            @click="editedSection = editedSection === 'child' ? '' : 'child'"
          />
        </div>
        <div v-if="editedSection === 'child'" class="information_detail">
          <QCardSection>
            <p class="sub-title">基本資料</p>
            <QInput
              outlined
              label="兒童姓名"
              dense
              :model-value="props.data?.child?.full_name"
              @update:model-value="
                emits('updateChild', {
                  ...props.data?.child,
                  full_name: $event,
                })
              "
            />
            <div class="q-gutter-sm">
              <QRadio
                val="男"
                label="男生"
                :model-value="props.data?.child?.gender"
                @update:model-value="
                  emits('updateChild', {
                    ...props.data?.child,
                    gender: $event,
                  })
                "
              />
              <QRadio
                val="女"
                label="女生"
                :model-value="props.data?.child?.gender"
                @update:model-value="
                  emits('updateChild', {
                    ...props.data?.child,
                    gender: $event,
                  })
                "
              />
              <QRadio
                val="其他"
                label="其他"
                :model-value="props.data?.child?.gender"
                @update:model-value="
                  emits('updateChild', {
                    ...props.data?.child,
                    gender: $event,
                  })
                "
              />
            </div>
            <QInput
              outlined
              dense
              label="出生日期"
              :model-value="props.data?.child?.birthdate"
              @update:model-value="
                emits('updateChild', {
                  ...props.data?.child,
                  birthdate: format($event, 'yyyy-MM-dd'),
                })
              "
            >
              <template v-slot:append>
                <QIcon name="event" class="cursor-pointer">
                  <QPopupProxy cover transition-show="scale" transition-hide="scale">
                    <QDate
                      :model-value="props.data?.child?.birthdate"
                      @update:model-value="
                        emits('updateChild', {
                          ...props.data?.child,
                          birthdate: format($event, 'yyyy-MM-dd'),
                        })
                      "
                    >
                      <div class="row items-center justify-end">
                        <QBtn v-close-popup label="Close" color="primary" flat />
                      </div>
                    </QDate>
                  </QPopupProxy>
                </QIcon>
              </template>
            </QInput>
            <QInput
              outlined
              label="身分證字號"
              dense
              :model-value="props.data?.child?.national_id_number"
              @update:model-value="
                emits('updateChild', {
                  ...props.data?.child,
                  national_id_number: $event,
                })
              "
            />
            <QInput
              outlined
              label="戶籍地址"
              dense
              :model-value="props.data?.child?.household_address"
              @update:model-value="
                emits('updateChild', {
                  ...props.data?.child,
                  household_address: $event,
                })
              "
            />
            <div class="row">
              <QCheckbox
                :model-value="
                  props.data?.child?.contact_address === props.data?.child?.household_address
                "
                @update:model-value="
                  emits(
                    'updateChild',
                    $event
                      ? {
                          ...props.data?.child,
                          contact_address: props.data?.child?.household_address,
                        }
                      : {
                          ...props.data?.child,
                          contact_address: '',
                        }
                  )
                "
                label="同上"
                class="col-12 col-sm-2"
              />
              <QInput
                outlined
                label="通訊地址"
                dense
                class="col-12 col-sm-10"
                :model-value="props.data?.child?.contact_address"
                @update:model-value="
                  emits('updateChild', {
                    ...props.data?.child,
                    contact_address: $event,
                  })
                "
              />
            </div>
          </QCardSection>
          <QCardSection>
            <p class="sub-title">身份別</p>
            <div>
              <QCheckbox
                :model-value="judgeIdentity('疑似發展遲緩')"
                @update:model-value="onUpdateIdentity($event, '疑似發展遲緩')"
                label="疑似發展遲緩"
              />
              <QCheckbox
                :model-value="judgeIdentity('發展遲緩')"
                @update:model-value="onUpdateIdentity($event, '發展遲緩')"
                label="發展遲緩"
              />
              <QCheckbox
                :model-value="judgeIdentity('身心障礙')"
                @update:model-value="onUpdateIdentity($event, '身心障礙')"
                label="身心障礙"
              />
              <QCheckbox
                :model-value="judgeIdentity('低收入戶')"
                @update:model-value="onUpdateIdentity($event, '低收入戶')"
                label="低收入戶"
              />
            </div>
            <div>
              <QCheckbox
                :model-value="judgeIdentity('原住民子女')"
                @update:model-value="onUpdateIdentity($event, '原住民子女')"
                label="原住民子女"
              />
            </div>
            <div>
              <QCheckbox
                :model-value="judgeIdentity('新住民子女')"
                @update:model-value="onUpdateIdentity($event, '新住民子女')"
                label="新住民子女"
              />
              <!-- <QInput v-if="identity6" outlined dense label="國籍"></QInput> -->
            </div>
          </QCardSection>

          <QCardSection>
            <p class="sub-title">檢附資料</p>
            <div class="valuation_report">
              <QCheckbox v-model="evaluationReport.checked" label="聯評報告書" />
              <div v-if="evaluationReport.checked" class="detail">
                <QInput
                  outlined
                  dense
                  :model-value="props.data?.child?.joint_evaluation_report_expired_on"
                  @update:model-value="
                    emits('updateChild', {
                      ...props.data?.child,
                      joint_evaluation_report_expired_on: $event,
                    })
                  "
                  label="聯評報告有效期限"
                  style="max-width: 300px"
                  class="q-pb-sm"
                >
                  <template v-slot:append>
                    <QIcon name="event" class="cursor-pointer">
                      <QPopupProxy cover transition-show="scale" transition-hide="scale">
                        <QDate
                          :model-value="props.data?.child?.joint_evaluation_report_expired_on"
                          @update:model-value="
                            emits('updateChild', {
                              ...props.data?.child,
                              joint_evaluation_report_expired_on: format($event, 'yyyy-MM-dd'),
                            })
                          "
                        >
                          <div class="row items-center justify-end">
                            <QBtn v-close-popup label="Close" color="primary" flat />
                          </div>
                        </QDate>
                      </QPopupProxy>
                    </QIcon>
                  </template>
                </QInput>
                <div class="file_upload">
                  <QFile
                    outlined
                    dense
                    multiple
                    append
                    clearable
                    :model-value="evaluationReport.files"
                    @update:model-value="
                      ($event) => {
                        evaluationReport.files = $event
                        emits('updateFile', {
                          joint_evaluation_report_copies: evaluationReport.files,
                        })
                      }
                    "
                    :label="evaluationReport.urls.length === 0 ? '上傳檔案' : '重新上傳檔案'"
                  >
                    <template v-slot:prepend>
                      <QIcon name="attach_file" />
                    </template>
                  </QFile>
                </div>
                <div v-if="evaluationReport.urls.length !== 0" class="file_link">
                  <span>前次上傳的檔案:</span>
                  <a
                    v-for="(url, index) in evaluationReport.urls"
                    :key="index"
                    :href="url"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {{ index + 1 }}
                  </a>
                </div>
              </div>
            </div>
            <div class="diagnosis_certificate">
              <QCheckbox v-model="diagnosisCertificate.checked" label="診斷證明" />
              <div v-if="diagnosisCertificate.checked" class="detail">
                <QInput
                  outlined
                  dense
                  :model-value="props.data?.child?.diagnosis_certificate_issued_on"
                  @update:model-value="
                    emits('updateChild', {
                      ...props.data?.child,
                      diagnosis_certificate_issued_on: format($event, 'yyyy-MM-dd'),
                    })
                  "
                  label="診斷證明開立日期"
                  style="max-width: 300px"
                  class="q-pb-sm"
                >
                  <template v-slot:append>
                    <QIcon name="event" class="cursor-pointer">
                      <QPopupProxy cover transition-show="scale" transition-hide="scale">
                        <QDate
                          :model-value="props.data?.child?.diagnosis_certificate_issued_on"
                          @update:model-value="
                            emits('updateChild', {
                              ...props.data?.child,
                              diagnosis_certificate_issued_on: format($event, 'yyyy-MM-dd'),
                            })
                          "
                        >
                          <div class="row items-center justify-end">
                            <QBtn v-close-popup label="Close" color="primary" flat />
                          </div>
                        </QDate>
                      </QPopupProxy>
                    </QIcon>
                  </template>
                </QInput>
                <div class="file_upload">
                  <QFile
                    outlined
                    dense
                    multiple
                    append
                    clearable
                    v-model="diagnosisCertificate.files"
                    :model-value="diagnosisCertificate.files"
                    @update:model-value="
                      ($event) => {
                        diagnosisCertificate.files = $event
                        emits('updateFile', {
                          diagnosis_certificate_copies: diagnosisCertificate.files,
                        })
                      }
                    "
                    :label="diagnosisCertificate.urls.length === 0 ? '上傳檔案' : '重新上傳檔案'"
                  >
                    <template v-slot:prepend>
                      <QIcon name="attach_file" />
                    </template>
                  </QFile>
                </div>

                <div v-if="diagnosisCertificate.urls.length !== 0" class="file_link">
                  <span>前次上傳的檔案:</span>
                  <a
                    v-for="(url, index) in diagnosisCertificate.urls"
                    :key="index"
                    :href="url"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {{ index + 1 }}
                  </a>
                </div>
              </div>
            </div>

            <div class="disability_identification">
              <QCheckbox v-model="disabilityIdentification.checked" label="身心障礙證明" />
              <div v-if="disabilityIdentification.checked" class="detail">
                <div class="file_upload">
                  <QFile
                    outlined
                    dense
                    multiple
                    append
                    clearable
                    :model-value="disabilityIdentification.files"
                    @update:model-value="
                      ($event) => {
                        disabilityIdentification.files = $event
                        emits('updateFile', {
                          disability_identification_copies: disabilityIdentification.files,
                        })
                      }
                    "
                    :label="
                      disabilityIdentification.urls.length === 0 ? '上傳檔案' : '重新上傳檔案'
                    "
                  >
                    <template v-slot:prepend>
                      <QIcon name="attach_file" />
                    </template>
                  </QFile>
                </div>
                <div v-if="disabilityIdentification.urls.length !== 0" class="file_link">
                  <span>前次上傳的檔案:</span>
                  <a
                    v-for="(url, index) in disabilityIdentification.urls"
                    :key="index"
                    :href="url"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {{ index + 1 }}
                  </a>
                </div>
              </div>
            </div>

            <div class="low_income_certificate">
              <QCheckbox v-model="lowIncomeCertificate.checked" label="低收入戶證明" />
              <div v-if="lowIncomeCertificate.checked" class="detail">
                <div class="file_upload">
                  <QFile
                    outlined
                    dense
                    multiple
                    append
                    clearable
                    :model-value="lowIncomeCertificate.files"
                    @update:model-value="
                      ($event) => {
                        lowIncomeCertificate.files = $event
                        emits('updateFile', {
                          low_income_certificate_copies: lowIncomeCertificate.files,
                        })
                      }
                    "
                    :label="lowIncomeCertificate.urls.length === 0 ? '上傳檔案' : '重新上傳檔案'"
                  >
                    <template v-slot:prepend>
                      <QIcon name="attach_file" />
                    </template>
                  </QFile>
                </div>
                <div v-if="lowIncomeCertificate.urls.length !== 0" class="file_link">
                  <span>前次上傳的檔案:</span>
                  <a
                    v-for="(url, index) in lowIncomeCertificate.urls"
                    :key="index"
                    :href="url"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {{ index + 1 }}
                  </a>
                </div>
              </div>
            </div>

            <div class="delay_school_entry_certificate">
              <QCheckbox v-model="delaySchoolEntryCertificate.checked" label="鑑輔會緩讀證明" />
              <div v-if="delaySchoolEntryCertificate.checked" class="detail">
                <div class="file_upload">
                  <QFile
                    outlined
                    dense
                    multiple
                    append
                    clearable
                    :model-value="delaySchoolEntryCertificate.files"
                    @update:model-value="
                      ($event) => {
                        delaySchoolEntryCertificate.files = $event
                        emits('updateFile', {
                          delayed_school_entry_copies: delaySchoolEntryCertificate.files,
                        })
                      }
                    "
                    :label="
                      delaySchoolEntryCertificate.urls.length === 0 ? '上傳檔案' : '重新上傳檔案'
                    "
                  >
                    <template v-slot:prepend>
                      <QIcon name="attach_file" />
                    </template>
                  </QFile>
                </div>
                <div v-if="delaySchoolEntryCertificate.urls.length !== 0" class="file_link">
                  <span>前次上傳的檔案:</span>
                  <a
                    v-for="(url, index) in delaySchoolEntryCertificate.urls"
                    :key="index"
                    :href="url"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {{ index + 1 }}
                  </a>
                </div>
              </div>
            </div>
          </QCardSection>
        </div>
      </div>
    </QCard>

    <QCard class="my-card">
      <div class="q-pa-md">
        <div class="title">
          <h6>郵局帳戶資料</h6>
          <QBtn
            flat
            color="black"
            :icon="editedSection === 'postalBankAccount' ? 'expand_more' : 'expand_less'"
            @click="
              editedSection = editedSection === 'postalBankAccount' ? '' : 'postalBankAccount'
            "
          />
        </div>
        <div v-if="editedSection === 'postalBankAccount'" class="information_detail">
          <QCardSection>
            <QInput
              outlined
              label="戶名"
              dense
              :model-value="props.data?.postal_bank_account?.account_name"
              @update:model-value="
                emits('updatePostalBankAccount', {
                  ...props.data?.postal_bank_account,
                  account_name: $event,
                })
              "
            />
            <QInput
              outlined
              label="身分證字號"
              dense
              :model-value="props.data?.postal_bank_account?.national_id_number"
              @update:model-value="
                emits('updatePostalBankAccount', {
                  ...props.data?.postal_bank_account,
                  national_id_number: $event,
                })
              "
            />
            <QInput
              outlined
              label="局號"
              dense
              :model-value="props.data?.postal_bank_account?.office_code"
              @update:model-value="
                emits('updatePostalBankAccount', {
                  ...props.data?.postal_bank_account,
                  office_code: $event,
                })
              "
            />
            <QInput
              outlined
              label="帳號"
              dense
              :model-value="props.data?.postal_bank_account.account_code_number"
              @update:model-value="
                emits('updatePostalBankAccount', {
                  ...props.data?.postal_bank_account,
                  account_code_number: $event,
                })
              "
            />
          </QCardSection>
          <QCardSection>
            <div class="file_upload">
              <QFile
                outlined
                dense
                multiple
                append
                clearable
                :model-value="postalPassbookCover.files"
                @update:model-value="
                  ($event) => {
                    postalPassbookCover.files = $event
                    emits('updateFile', {
                      postal_passbook_cover_copies: postalPassbookCover.files,
                    })
                  }
                "
                :label="!postalPassbookCover.url ? '上傳郵局存摺封面' : '重新上傳郵局存摺封面'"
              >
                <template v-slot:prepend>
                  <QIcon name="attach_file" />
                </template>
              </QFile>
            </div>
            <div v-if="postalPassbookCover.url" class="file_link">
              <span>前次上傳的檔案:</span>
              <a :href="postalPassbookCover.url" target="_blank" rel="noopener noreferrer"> 1 </a>
            </div>
          </QCardSection>
        </div>
      </div>
    </QCard>
    <div>
      <slot></slot>
    </div>
  </QForm>
</template>

<style lang="scss" scoped>
.personal_data {
  padding: 2rem;
  > div + div {
    margin-top: 1.5rem;
  }
}
.title {
  display: flex;
  align-items: center;
}
.information_detail > div {
  > * + * {
    margin-top: 0.5rem;
  }
}
.sub-title {
  font-size: 16px;
  font-weight: bold;
}
.action {
  > * + * {
    margin-top: 0.5rem;
  }
  :deep(.send) {
    width: 100%;
  }
}
.detail {
  padding: 10px 40px;
}
.file_upload {
  display: flex;
  gap: 1rem;
}
</style>
