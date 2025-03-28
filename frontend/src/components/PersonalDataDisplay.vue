<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  activeId: {
    type: String,
    default: '',
  },
  applicationId: {
    type: String,
    default: '',
  },
  data: {
    type: Object,
    default: () => ({}),
  },
})
const editedSection = ref('applicant')
const renderedGender = computed(() => {
  const genderMap = {
    男: '男生',
    女: '女生',
    其他: '其他',
  }
  return genderMap[`${props.data.child.gender}`]
})
const renderedIdentity = computed(() => {
  return props.data.child.identities.join(',')
})
</script>

<template>
  <QForm style="min-width: 300px; max-width: 800px; margin: 0 auto" class="personal_data">
    <QCard class="my-card">
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
              :model-value="props.data.applicant.full_name"
              readonly
            />
            <QInput
              outlined
              label="與兒童關係"
              dense
              :model-value="props.data.applicant.relation_to_child"
              readonly
            />
            <QInput
              outlined
              label="聯絡電話"
              dense
              :model-value="props.data.applicant.phone"
              readonly
            />
          </QCardSection>

          <QCardSection v-if="props.data.household_certificate_copies_urls?.length !== 0">
            <div class="upload_file">戶口名簿</div>
            <div class="file_link">
              <a
                v-for="(url, index) in props.data.household_certificate_copies_urls ?? []"
                :key="index"
                :href="url"
                target="_blank"
                rel="noopener noreferrer"
              >
                檢視{{ index + 1 }}
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
            <div class="sub_title">基本資料</div>
            <QInput
              outlined
              label="兒童姓名"
              dense
              :model-value="props.data.child.full_name"
              readonly
            />
            <QInput outlined label="性別" dense :model-value="renderedGender" readonly />
            <QInput
              outlined
              dense
              label="出生日期"
              :model-value="props.data.child.birthdate"
              readonly
            />
            <QInput
              outlined
              label="身分證字號"
              dense
              :model-value="props.data.child.national_id_number"
              readonly
            />
            <QInput
              outlined
              label="戶籍地址"
              dense
              :model-value="props.data.child.household_address"
              readonly
            />
            <QInput
              outlined
              label="通訊地址"
              dense
              :model-value="props.data.child.contact_address"
              readonly
            />
            <QInput outlined label="身分別" dense :model-value="renderedIdentity" readonly />
          </QCardSection>

          <QCardSection>
            <p class="sub_title">檢附資料</p>
            <div
              v-if="props.data.joint_evaluation_report_copies_urls?.length !== 0"
              class="valuation_report"
            >
              <div class="upload_file">聯評報告書</div>
              <div class="file_detail">
                <QInput
                  outlined
                  dense
                  :model-value="props.data.child.joint_evaluation_report_expired_on"
                  readonly
                  label="聯評報告有效期限"
                  style="max-width: 300px"
                  class="q-pb-sm"
                />

                <div class="file_link">
                  <a
                    v-for="(url, index) in props.data.joint_evaluation_report_copies_urls ?? []"
                    :key="index"
                    :href="url"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    檢視{{ index + 1 }}
                  </a>
                </div>
              </div>
            </div>
            <div
              v-if="props.data.diagnosis_certificate_copies_urls?.length !== 0"
              class="diagnosis_certificate"
            >
              <div class="upload_file">診斷證明</div>
              <div class="file_detail">
                <QInput
                  outlined
                  dense
                  :model-value="props.data.child.diagnosis_certificate_issued_on"
                  readonly
                  label="診斷證明開立日期"
                  style="max-width: 300px"
                  class="q-pb-sm"
                />

                <div class="file_link">
                  <a
                    v-for="(url, index) in props.data.diagnosis_certificate_copies_urls ?? []"
                    :key="index"
                    :href="url"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    檢視{{ index + 1 }}
                  </a>
                </div>
              </div>
            </div>

            <div
              v-if="props.data.diagnosis_certificate_copies_urls?.length !== 0"
              class="disability_identification"
            >
              <div class="upload_file">身心障礙證明</div>
              <div class="file_detail">
                <div class="file_link">
                  <a
                    v-for="(url, index) in props.data.diagnosis_certificate_copies_urls ?? []"
                    :key="index"
                    :href="url"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    檢視{{ index + 1 }}
                  </a>
                </div>
              </div>
            </div>

            <div
              v-if="props.data.low_income_certificate_copies_urls?.length !== 0"
              class="low_income_certificate"
            >
              <div class="upload_file">低收入戶證明</div>
              <div class="file_detail">
                <div class="file_link">
                  <a
                    v-for="(url, index) in props.data.low_income_certificate_copies_urls ?? []"
                    :key="index"
                    :href="url"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    檢視{{ index + 1 }}
                  </a>
                </div>
              </div>
            </div>

            <div
              v-if="props.data.delayed_school_entry_copies_urls?.length !== 0"
              class="delay_school_entry_certificate"
            >
              <div class="upload_file">鑑輔會緩讀證明</div>
              <div class="file_detail">
                <div class="file_link">
                  <a
                    v-for="(url, index) in props.data.delayed_school_entry_copies_urls ?? []"
                    :key="index"
                    :href="url"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    檢視{{ index + 1 }}
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
              :model-value="props.data.postal_bank_account.account_name"
              readonly
            />
            <QInput
              outlined
              label="身分證字號"
              dense
              :model-value="props.data.postal_bank_account.national_id_number"
              readonly
            />
            <QInput
              outlined
              label="局號"
              dense
              :model-value="props.data.postal_bank_account.office_code"
              readonly
            />
            <QInput
              outlined
              label="帳號"
              dense
              :model-value="props.data.postal_bank_account.account_code_number"
              readonly
            />
          </QCardSection>

          <QCardSection v-if="props.data.postal_passbook_cover_copies_urls?.length !== 0">
            <div class="upload_file">郵局存摺封面</div>
            <div class="file_link">
              <a
                :href="props.data.postal_passbook_cover_copies_urls ?? ''"
                target="_blank"
                rel="noopener noreferrer"
              >
                檢視
              </a>
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
.sub_title {
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
.upload_file {
  font-weight: 900;
}
.file_link a {
  color: $primary;
  text-decoration: underline;
}
.file_detail {
  padding: 10px 10px;
}
</style>
