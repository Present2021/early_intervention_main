<template>
  <QForm style="min-width: 300px; max-width: 800px; margin: 0 auto" class="personal_data">
    <!-- <div class="q-pa-md"> -->
    <div class="information_detail">
      <QCardSection>
        <div class="text-h6">
          {{ props.data.child.full_name }} {{ props.data.child.national_id_number }}
        </div>

        <div class="q-gutter-sm">
          <QRadio val="男" label="男生" :model-value="props.data.child.gender" />
          <QRadio val="女" label="女生" :model-value="props.data.child.gender" readonly />
          <QRadio val="其他" label="其他" :model-value="props.data.child.gender" readonly />
        </div>
        <QInput outlined dense label="出生日期" :model-value="props.data.child.birthdate" readonly>
        </QInput>
        <QInput
          outlined
          label="戶籍地址"
          dense
          :model-value="props.data.child.household_address"
          readonly
        />
        <div class="row">
          <QCheckbox
            :model-value="props.data.child.contact_address === props.data.child.household_address"
            readonly
            label="同上"
            class="col-12 col-sm-2"
          />
          <QInput
            outlined
            label="通訊地址"
            dense
            class="col-12 col-sm-10"
            :model-value="props.data.child.contact_address"
            readonly
          />
        </div>
        <div class="file_link">
          <p class="sub_title q-mb-none">戶口名簿</p>
          <div v-if="householdCertificate.urls.length !== 0">
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
          <p v-else>尚無檔案</p>
        </div>
      </QCardSection>

      <QCardSection class="q-pt-none">
        <p class="sub_title q-mb-none">身份別</p>
        <div>
          <QCheckbox :model-value="judgeIdentity('疑似發展遲緩')" readonly label="疑似發展遲緩" />
          <QCheckbox :model-value="judgeIdentity('發展遲緩')" readonly label="發展遲緩" />
          <QCheckbox :model-value="judgeIdentity('身心障礙')" readonly label="身心障礙" />
          <QCheckbox :model-value="judgeIdentity('低收入戶')" readonly label="低收入戶" />
        </div>
        <div>
          <QCheckbox :model-value="judgeIdentity('原住民子女')" readonly label="原住民子女" />
        </div>
        <div>
          <QCheckbox :model-value="judgeIdentity('新住民子女')" readonly label="新住民子女" />
          <!-- <QInput v-if="identity6" outlined dense label="國籍"></QInput> -->
        </div>
      </QCardSection>

      <QCardSection class="q-pt-none">
        <p class="sub_title q-mb-none">檢附資料</p>
        <div class="valuation_report">
          <QCheckbox readonly :model-value="evaluationReport.checked" label="聯評報告書" />
          <div v-if="evaluationReport.checked" class="detail">
            <QInput
              outlined
              dense
              :model-value="props.data.child.joint_evaluation_report_expired_on"
              readonly
              label="聯評報告有效期限"
              style="max-width: 300px"
              class="q-pb-sm"
            />

            <div v-if="evaluationReport.urls.length !== 0" class="file_link">
              <span>聯評報告連結:</span>
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
          <QCheckbox readonly :model-value="diagnosisCertificate.checked" label="診斷證明" />
          <div v-if="diagnosisCertificate.checked" class="detail">
            <QInput
              outlined
              dense
              :model-value="props.data.child.diagnosis_certificate_issued_on"
              readonly
              label="診斷證明開立日期"
              style="max-width: 300px"
              class="q-pb-sm"
            />

            <div v-if="diagnosisCertificate.urls.length !== 0" class="file_link">
              <span>診斷證明連結:</span>
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
          <QCheckbox
            readonly
            :model-value="disabilityIdentification.checked"
            label="身心障礙證明"
          />
          <div v-if="disabilityIdentification.checked" class="detail">
            <div v-if="disabilityIdentification.urls.length !== 0" class="file_link">
              <span>身心障礙證明連結:</span>
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
          <QCheckbox readonly :model-value="lowIncomeCertificate.checked" label="低收入戶證明" />
          <div v-if="lowIncomeCertificate.checked" class="detail">
            <div v-if="lowIncomeCertificate.urls.length !== 0" class="file_link">
              <span>低收入戶證明連結:</span>
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
          <QCheckbox
            readonly
            :model-value="delaySchoolEntryCertificate.checked"
            label="鑑輔會緩讀證明"
          />
          <div v-if="delaySchoolEntryCertificate.checked" class="detail">
            <div v-if="delaySchoolEntryCertificate.urls.length !== 0" class="file_link">
              <span>緩讀證明連結:</span>
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
      <QCardSection class="q-pt-none">
        <p class="sub_title q-mb-none">申請人資料</p>
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
      <QCardSection>
        <p class="sub_title q-mb-none">帳戶資料</p>
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
        <div class="file_link">
          <span class="sub_title q-mb-none">郵局存摺封面連結:</span>
          <div v-if="postalPassbookCover.url">
            <a :href="postalPassbookCover.url" target="_blank" rel="noopener noreferrer"> 1 </a>
          </div>
          <p v-else>尚無檔案</p>
        </div>
      </QCardSection>
    </div>
    <!-- </div> -->
    <!-- <div class="information_detail"> -->

    <!-- </div> -->
    <!-- <div class="q-pa-md"> -->
    <!-- <div class="information_detail"> -->

    <!-- </div> -->
    <!-- </div> -->
    <QSeparator></QSeparator>
    <div>
      <slot></slot>
    </div>
  </QForm>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
})

const householdCertificate = ref({
  urls: props.data.household_certificate_copies_urls || [],
  files: null,
})
const evaluationReport = ref({
  urls: props.data.joint_evaluation_report_copies_urls || [],
  files: null,
  checked:
    !!props.data.joint_evaluation_report_copies_urls &&
    props.data.joint_evaluation_report_copies_urls.length !== 0,
})
const diagnosisCertificate = ref({
  urls: props.data.diagnosis_certificate_copies_urls || [],
  files: null,
  checked:
    !!props.data.diagnosis_certificate_copies_urls &&
    props.data.diagnosis_certificate_copies_urls.length !== 0,
})
const lowIncomeCertificate = ref({
  urls: props.data.low_income_certificate_copies_urls || [],
  files: null,
  checked:
    !!props.data.low_income_certificate_copies_urls &&
    props.data.low_income_certificate_copies_urls.length !== 0,
})
const delaySchoolEntryCertificate = ref({
  urls: props.data.delayed_school_entry_copies_urls || [],
  files: null,
  checked:
    !!props.data.delayed_school_entry_copies_urls &&
    props.data.delayed_school_entry_copies_urls.length !== 0,
})

const disabilityIdentification = ref({
  urls: props.data.disability_identification_copies_urls || [],
  files: null,
  checked:
    !!props.data.disability_identification_copies_urls &&
    props.data.disability_identification_copies_urls.length !== 0,
})

const postalPassbookCover = ref({
  url: props.data.postal_passbook_cover_copy_url,
  file: null,
})
function judgeIdentity(type) {
  return props.data.child.identities.includes(type)
}
</script>

<style lang="scss" scoped>
.personal_data {
  padding: 1rem;
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
.detail {
  padding: 10px 40px;
}
</style>
