<template>
  <div class="container">
    <p
      style="
        margin-right: 0cm;
        margin-bottom: 0cm;
        margin-left: 0cm;
        font-size: 16px;
        font-family: 'Times New Roman', serif;
        margin: 0cm;
        line-height: 18pt;
      "
    >
      <strong
        ><span style="font-size: 21px; font-family: 標楷體; color: black"
          >&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</span
        ></strong
      ><strong
        ><span style="font-size: 21px; font-family: 標楷體; color: black"
          >臺南市政府社會局發展遲緩兒童療育補助申請表</span
        ></strong
      ><strong
        ><span style="font-size: 11px; font-family: 標楷體; color: black"
          >&nbsp; &nbsp; 113.06.26</span
        ></strong
      ><strong><span style="font-size: 11px; font-family: 標楷體; color: black">修訂</span></strong>
    </p>
    <p
      style="
        margin-right: 0cm;
        margin-bottom: 0cm;
        margin-left: 0cm;
        font-size: 16px;
        font-family: 'Times New Roman', serif;
        margin: 0cm;
        line-height: 18pt;
      "
    >
      <strong
        ><span style="font-family: 標楷體; color: black"
          >初審單位：<u>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</u>區公所</span
        ></strong
      ><strong><span style="font-size: 11px; font-family: 標楷體; color: black">(</span></strong
      ><strong
        ><span style="font-size: 11px; font-family: 標楷體; color: black"
          >應為幼兒戶籍所在地公所)</span
        ></strong
      ><span style="font-family: 標楷體; color: black">&nbsp; &nbsp; &nbsp;&nbsp;</span
      ><strong
        ><span id="apllicant_date" style="font-family: 標楷體; color: black"
          >申請日期：&nbsp; {{ getYear(new Date()) - 1911 }} 年 {{ format(new Date(), 'MM') }} 月
          {{ format(new Date(), 'dd') }} 日</span
        ></strong
      ><strong><span style="font-size: 13px; font-family: 標楷體; color: black">(</span></strong
      ><strong
        ><span style="font-size: 13px; font-family: 標楷體; color: black">請務必填寫)</span></strong
      ><strong
        ><span style="font-family: 標楷體; color: black"
          >&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
          &nbsp; &nbsp;</span
        ></strong
      ><span style="font-family: 標楷體; color: black"
        >&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</span
      >
    </p>
    <table
      style="
        float: left;
        border-collapse: collapse;
        border: none;
        margin-left: 6.75pt;
        margin-right: 6.75pt;
        width: 687px;
      "
    >
      <tbody>
        <tr>
          <td
            style="
              width: 29.75pt;
              border-top: 1.5pt;
              border-left: 1.5pt;
              border-bottom: 1pt;
              border-right: 1pt;
              border-color: windowtext;
              border-style: solid;
              padding: 0cm 1.4pt 0cm 1.4pt;
              writing-mode: vertical-rl;
              height: 44pt;
            "
          >
            <p
              style="
                margin-right: 5.65pt;
                margin-bottom: 0.0001pt;
                margin-left: 5.65pt;
                font-size: 16px;
                font-family: 'Times New Roman', serif;
                margin: 0cm;
                margin-top: 0cm;
                text-align: justify;
                line-height: 18pt;
              "
            >
              <strong><span style="font-family: 標楷體; color: black">申請人</span></strong>
            </p>
          </td>

          <!-- 申請人姓名 -->
          <td
            style="
              width: 35.45pt;
              border-top: solid windowtext 1.5pt;
              border-left: none;
              border-bottom: solid windowtext 1pt;
              border-right: solid windowtext 1pt;
              padding: 0cm 1.4pt 0cm 1.4pt;
              height: 44pt;
            "
          >
            <p
              style="
                margin-right: 0cm;
                margin-bottom: 0cm;
                margin-left: 0cm;
                font-size: 16px;
                font-family: 'Times New Roman', serif;
                margin: 0cm;
                text-align: center;
                line-height: 16pt;
              "
            >
              <span style="font-family: 標楷體; color: black">姓名</span>
            </p>
          </td>
          <td
            id="applicant_of_name"
            colspan="2"
            style="
              width: 21.2518%;
              border-top: 1.5pt solid windowtext;
              border-left: none;
              border-bottom: 1pt solid windowtext;
              border-right: 1pt solid windowtext;
              padding: 0cm 1.4pt;
              height: 44pt;
              vertical-align: bottom;
            "
          >
            <p
              style="
                margin-right: 0cm;
                margin-bottom: 0cm;
                margin-left: 0cm;
                font-size: 16px;
                font-family: 'Times New Roman', serif;
                margin: 0cm;
                text-align: center;
                line-height: 16pt;
              "
            >
              <span class="text-blue-9" style="font-family: 標楷體">{{
                informationsStore.information?.applicant?.full_name
              }}</span>
            </p>

            <p
              style="
                margin-right: 0cm;
                margin-bottom: 0cm;
                margin-left: 0cm;
                font-size: 16px;
                font-family: 'Times New Roman', serif;
                margin: 0cm;
                line-height: 16pt;
              "
            >
              <strong
                ><span style="font-size: 11px; font-family: 標楷體; color: black"
                  >請於就診日起4個月內申請</span
                ></strong
              >
            </p>
          </td>

          <!-- 與兒童關係 -->
          <td
            colspan="2"
            style="
              width: 9.607%;
              border-top: 1.5pt solid windowtext;
              border-left: none;
              border-bottom: 1pt solid windowtext;
              border-right: 1pt solid windowtext;
              padding: 0cm 1.4pt;
              height: 44pt;
            "
          >
            <p
              style="
                margin-right: 0cm;
                margin-bottom: 0cm;
                margin-left: 0cm;
                font-size: 16px;
                font-family: 'Times New Roman', serif;
                margin: 0cm;
                text-align: center;
                line-height: 16pt;
              "
            >
              <span style="font-family: 標楷體; color: black">與兒童</span>
            </p>
            <p
              style="
                margin-right: 0cm;
                margin-bottom: 0cm;
                margin-left: 0cm;
                font-size: 16px;
                font-family: 'Times New Roman', serif;
                margin: 0cm;
                text-align: center;
                line-height: 16pt;
              "
            >
              <span style="font-family: 標楷體; color: black">關&nbsp;&nbsp;係</span>
            </p>
          </td>
          <td
            id="relation_to_child"
            colspan="4"
            style="
              width: 77.95pt;
              border-top: solid windowtext 1.5pt;
              border-left: none;
              border-bottom: solid windowtext 1pt;
              border-right: solid windowtext 1pt;
              padding: 0cm 1.4pt 0cm 1.4pt;
              height: 44pt;
            "
          >
            <p
              style="
                margin-right: 0cm;
                margin-bottom: 0cm;
                margin-left: 0cm;
                font-size: 16px;
                font-family: 'Times New Roman', serif;
                margin: 0cm;
                text-align: center;
                line-height: 16pt;
              "
            >
              <span class="text-blue-9" style="font-family: 標楷體">{{
                informationsStore.information?.applicant?.relation_to_child
              }}</span>
            </p>
          </td>

          <!-- 連絡電話 -->
          <td
            colspan="2"
            style="
              width: 1cm;
              border-top: solid windowtext 1.5pt;
              border-left: none;
              border-bottom: solid windowtext 1pt;
              border-right: solid windowtext 1pt;
              padding: 0cm 1.4pt 0cm 1.4pt;
              height: 44pt;
            "
          >
            <p
              style="
                margin-right: 0cm;
                margin-bottom: 0cm;
                margin-left: 0cm;
                font-size: 16px;
                font-family: 'Times New Roman', serif;
                margin: 0cm;
                text-align: center;
                line-height: 16pt;
              "
            >
              <span style="font-family: 標楷體; color: black">聯絡</span>
            </p>
            <p
              style="
                margin-right: 0cm;
                margin-bottom: 0cm;
                margin-left: 0cm;
                font-size: 16px;
                font-family: 'Times New Roman', serif;
                margin: 0cm;
                text-align: center;
                line-height: 16pt;
              "
            >
              <span style="font-family: 標楷體; color: black">電話</span>
            </p>
          </td>
          <td
            id="phone"
            colspan="5"
            style="
              width: 195.05pt;
              border-top: solid windowtext 1.5pt;
              border-left: none;
              border-bottom: solid windowtext 1pt;
              border-right: solid windowtext 1.5pt;
              padding: 0cm 1.4pt 0cm 1.4pt;
              height: 44pt;
            "
          >
            <p
              style="
                margin-right: 0cm;
                margin-bottom: 0cm;
                margin-left: 0cm;
                font-size: 16px;
                font-family: 'Times New Roman', serif;
                margin: 0cm;
                line-height: 16pt;
                text-align: center;
              "
            >
              <span class="text-blue-9" style="font-family: 標楷體">{{
                informationsStore.information?.applicant?.phone
              }}</span>
            </p>
          </td>
        </tr>

        <!-- 兒童資料 -->
        <tr>
          <td
            rowspan="4"
            style="
              width: 29.75pt;
              border-top: none;
              border-left: solid windowtext 1.5pt;
              border-bottom: solid windowtext 1pt;
              border-right: solid windowtext 1pt;
              padding: 0cm 1.4pt 0cm 1.4pt;
              layout-flow: vertical-ideographic;
              height: 49.05pt;
            "
          >
            <p
              style="
                margin-right: 5.65pt;
                margin-bottom: 0.0001pt;
                margin-left: 5.65pt;
                font-size: 16px;
                font-family: 'Times New Roman', serif;
                margin: 0cm;
                margin-top: 0cm;
                text-align: center;
                line-height: 18pt;
              "
            >
              <strong><span style="font-family: 標楷體; color: black">兒童資料</span></strong>
            </p>
          </td>

          <!-- 兒童姓名 -->
          <td
            style="
              width: 35.45pt;
              border-top: none;
              border-left: none;
              border-bottom: solid windowtext 1pt;
              border-right: solid windowtext 1pt;
              padding: 0cm 1.4pt 0cm 1.4pt;
              height: 49.05pt;
            "
          >
            <p
              style="
                margin-right: 0cm;
                margin-bottom: 0cm;
                margin-left: 0cm;
                font-size: 16px;
                font-family: 'Times New Roman', serif;
                margin: 0cm;
                text-align: center;
                line-height: 16pt;
              "
            >
              <span style="font-family: 標楷體; color: black">姓名</span>
            </p>
          </td>
          <td
            id="child_of_name"
            colspan="2"
            style="
              width: 21.2518%;
              border-top: none;
              border-left: none;
              border-bottom: 1pt solid windowtext;
              border-right: 1pt solid windowtext;
              padding: 0cm 1.4pt;
              height: 49.05pt;
            "
          >
            <p
              style="
                margin-right: 0cm;
                margin-bottom: 0cm;
                margin-left: 0cm;
                font-size: 16px;
                font-family: 'Times New Roman', serif;
                margin: 0cm;
                text-align: center;
                line-height: 16pt;
              "
            >
              <span class="text-blue-9" style="font-family: 標楷體">{{
                informationsStore.information?.child?.full_name
              }}</span>
            </p>
          </td>

          <td
            id="gender"
            colspan="2"
            style="
              width: 9.607%;
              border-top: none;
              border-left: none;
              border-bottom: 1pt solid windowtext;
              border-right: 1pt solid windowtext;
              padding: 0cm 1.4pt;
              height: 49.05pt;
              vertical-align: bottom;
            "
          >
            <p
              style="
                margin-right: 0cm;
                margin-bottom: 0cm;
                margin-left: 0cm;
                font-size: 16px;
                font-family: 'Times New Roman', serif;
                margin: 0cm;
                text-align: center;
                line-height: 16pt;
              "
            >
              <strong v-if="informationsStore.information?.child?.gender === '男生'"
                ><span style="font-family: 標楷體; color: black">□</span></strong
              >
              <strong v-else><span style="font-family: 標楷體; color: black">■</span></strong>
              <span style="font-family: 標楷體; color: black">男生</span>
            </p>
            <p
              style="
                margin-right: 0cm;
                margin-bottom: 0cm;
                margin-left: 0cm;
                font-size: 16px;
                font-family: 'Times New Roman', serif;
                margin: 0cm;
                text-align: center;
                line-height: 16pt;
              "
            >
              <strong v-if="informationsStore.information?.child?.gender === '女生'"
                ><span style="font-family: 標楷體; color: black">■</span></strong
              >
              <strong v-else><span style="font-family: 標楷體; color: black">□</span></strong>
              <span style="font-family: 標楷體; color: black">女生</span>
            </p>
            <p
              style="
                margin-right: 0cm;
                margin-bottom: 0cm;
                margin-left: 0cm;
                font-size: 16px;
                font-family: 'Times New Roman', serif;
                margin: 0cm;
                text-align: center;
                line-height: 16pt;
              "
            >
              <strong v-if="informationsStore.information?.child?.gender === '其他'"
                ><span style="font-family: 標楷體; color: black">■</span></strong
              >
              <strong v-else><span style="font-family: 標楷體; color: black">□</span></strong>
              <span style="font-family: 標楷體; color: black">其他</span>
            </p>
            <p
              style="
                margin-right: 0cm;
                margin-bottom: 0cm;
                margin-left: 0cm;
                font-size: 16px;
                font-family: 'Times New Roman', serif;
                margin: 0cm;
                line-height: 16pt;
              "
            >
              <span style="font-family: 標楷體; color: black">&nbsp;</span>
            </p>
          </td>

          <!-- 出生日期 -->
          <td
            colspan="2"
            style="
              width: 1cm;
              border-top: none;
              border-left: none;
              border-bottom: solid windowtext 1pt;
              border-right: solid windowtext 1pt;
              padding: 0cm 1.4pt 0cm 1.4pt;
              height: 49.05pt;
            "
          >
            <p
              style="
                margin-right: 0cm;
                margin-bottom: 0cm;
                margin-left: 0cm;
                font-size: 16px;
                font-family: 'Times New Roman', serif;
                margin: 0cm;
                text-align: center;
                line-height: 16pt;
              "
            >
              <span style="font-family: 標楷體; color: black">出生日期</span>
            </p>
          </td>
          <td
            id="birthdate"
            colspan="4"
            style="
              width: 77.95pt;
              border-top: none;
              border-left: none;
              border-bottom: solid windowtext 1pt;
              border-right: solid windowtext 1pt;
              padding: 0cm 1.4pt 0cm 1.4pt;
              height: 49.05pt;
            "
          >
            <p
              style="
                margin-right: 0cm;
                margin-bottom: 0cm;
                margin-left: 0cm;
                font-size: 16px;
                font-family: 'Times New Roman', serif;
                margin: 0cm;
                text-align: center;
                line-height: 16pt;
              "
            >
              <span class="text-blue-9" style="font-family: 標楷體">{{
                informationsStore.information?.child?.birthdate
              }}</span>
            </p>
          </td>

          <!-- 身分證字號 -->
          <td
            colspan="2"
            style="
              width: 63.8pt;
              border-top: none;
              border-left: none;
              border-bottom: solid windowtext 1pt;
              border-right: solid windowtext 1pt;
              padding: 0cm 1.4pt 0cm 1.4pt;
              height: 49.05pt;
            "
          >
            <p
              style="
                margin-right: 0cm;
                margin-bottom: 0cm;
                margin-left: 0cm;
                font-size: 16px;
                font-family: 'Times New Roman', serif;
                margin: 0cm;
                text-align: center;
                line-height: 16pt;
              "
            >
              <span style="font-family: 標楷體; color: black">身分證</span>
            </p>
            <p
              style="
                margin-right: 0cm;
                margin-bottom: 0cm;
                margin-left: 0cm;
                font-size: 16px;
                font-family: 'Times New Roman', serif;
                margin: 0cm;
                text-align: center;
                line-height: 16pt;
              "
            >
              <span style="font-family: 標楷體; color: black">字&nbsp;&nbsp;號</span>
            </p>
          </td>
          <td
            id="national_id_number"
            colspan="3"
            style="
              width: 131.25pt;
              border-top: none;
              border-left: none;
              border-bottom: solid windowtext 1pt;
              border-right: solid windowtext 1.5pt;
              padding: 0cm 1.4pt 0cm 1.4pt;
              height: 49.05pt;
            "
          >
            <p
              style="
                margin-right: 0cm;
                margin-bottom: 0cm;
                margin-left: 0cm;
                font-size: 16px;
                font-family: 'Times New Roman', serif;
                margin: 0cm;
                text-align: center;
                line-height: 16pt;
              "
            >
              <span class="text-blue-9" style="font-family: 標楷體">{{
                informationsStore.information?.child?.national_id_number
              }}</span>
            </p>
          </td>
        </tr>
        <tr>
          <!-- 戶籍地址 -->
          <td
            id="household_address"
            colspan="11"
            style="
              width: 290.6pt;
              border-top: none;
              border-left: none;
              border-bottom: solid windowtext 1pt;
              border-right: solid windowtext 1pt;
              padding: 0cm 1.4pt 0cm 1.4pt;
              height: 28.75pt;
            "
          >
            <p
              style="
                margin-right: 0cm;
                margin-bottom: 0cm;
                margin-left: 0cm;
                font-size: 16px;
                font-family: 'Times New Roman', serif;
                margin: 0cm;
                line-height: 18pt;
              "
            >
              <span style="font-family: 標楷體; color: black"
                >戶籍地址：
                <span class="text-blue-9">{{
                  informationsStore.information?.child?.household_address
                }}</span>
              </span>
            </p>
          </td>
          <!-- 申請勾勾 -->
          <td
            colspan="5"
            rowspan="2"
            style="
              width: 195.05pt;
              border-top: none;
              border-left: none;
              border-bottom: solid windowtext 1pt;
              border-right: solid windowtext 1.5pt;
              padding: 0cm 1.4pt 0cm 1.4pt;
              height: 28.75pt;
            "
          >
            <p
              style="
                margin-right: 0cm;
                margin-bottom: 0cm;
                margin-left: 0cm;
                font-size: 16px;
                font-family: 'Times New Roman', serif;
                margin: 0cm;
                line-height: 18pt;
              "
            >
              <span style="font-size: 13px; font-family: 標楷體; color: black">1.</span
              ><span style="font-size: 13px; font-family: 標楷體; color: black"
                >首次申請：□是&nbsp;□否</span
              ><span style="font-size: 9px; font-family: 標楷體; color: black">(</span
              ><span style="font-size: 9px; font-family: 標楷體; color: black"
                >為「是」者，請續下一題)</span
              >
            </p>
            <p
              style="
                margin-right: 0cm;
                margin-bottom: 0cm;
                margin-left: 0cm;
                font-size: 16px;
                font-family: 'Times New Roman', serif;
                margin: 0cm;
                line-height: 18pt;
              "
            >
              <span style="font-size: 13px; font-family: 標楷體; color: black">2.</span
              ><span style="font-size: 13px; font-family: 標楷體; color: black"
                >已通報本市兒童早期發展服務管理中心：</span
              >
            </p>
            <p
              style="
                margin-right: 0cm;
                margin-bottom: 0cm;
                margin-left: 0cm;
                font-size: 16px;
                font-family: 'Times New Roman', serif;
                margin: 0cm;
                line-height: 18pt;
              "
            >
              <span style="font-size: 13px; font-family: 標楷體; color: black">&nbsp; □</span
              ><span style="font-size: 13px; font-family: 標楷體; color: black">是&nbsp;□否</span>
            </p>
          </td>
        </tr>

        <tr>
          <td
            id="contact_address"
            colspan="11"
            style="
              width: 290.6pt;
              border-top: none;
              border-left: none;
              border-bottom: solid windowtext 1pt;
              border-right: solid windowtext 1pt;
              padding: 0cm 1.4pt 0cm 1.4pt;
              height: 28.45pt;
            "
          >
            <p
              style="
                margin-right: 0cm;
                margin-bottom: 0cm;
                margin-left: 0cm;
                font-size: 16px;
                font-family: 'Times New Roman', serif;
                margin: 0cm;
                line-height: 18pt;
              "
            >
              <span style="font-family: 標楷體; color: black">
                通訊地址： (
                <strong v-if="addressIsSame"> ■</strong>
                <strong v-else>□</strong>同上)
                <span class="text-blue-9">
                  {{ informationsStore.information?.child?.contact_address }}
                </span>
              </span>
            </p>
          </td>
        </tr>

        <!-- 身分勾勾 -->
        <tr>
          <td
            id="identities"
            colspan="16"
            style="
              width: 485.65pt;
              border-top: none;
              border-left: none;
              border-bottom: solid windowtext 1pt;
              border-right: solid windowtext 1.5pt;
              padding: 0cm 1.4pt 0cm 1.4pt;
              height: 36pt;
            "
          >
            <p
              style="
                margin-right: 0cm;
                margin-bottom: 0cm;
                margin-left: 0cm;
                font-size: 16px;
                font-family: 'Times New Roman', serif;
                margin: 0cm;
                line-height: 16pt;
              "
            >
              <span style="font-family: 標楷體; color: black">
                身分別：
                <span>
                  <strong
                    v-if="informationsStore.information.child.identities.includes('疑似發展遲緩')"
                  >
                    ■
                  </strong>
                  <strong v-else>□</strong>
                  疑似發展遲緩/&nbsp;
                </span>
                <span>
                  <strong
                    v-if="informationsStore.information.child.identities.includes('發展遲緩')"
                  >
                    ■
                  </strong>
                  <strong v-else>□</strong>
                  發展遲緩/&nbsp;
                </span>
                <span>
                  <strong
                    v-if="informationsStore.information.child.identities.includes('身心障礙')"
                  >
                    ■
                  </strong>
                  <strong v-else>□</strong>
                  身心障礙/&nbsp;
                </span>
                <span>
                  <strong
                    v-if="informationsStore.information.child.identities.includes('低收入戶')"
                  >
                    ■
                  </strong>
                  <strong v-else>□</strong>
                  低收入戶/&nbsp;
                </span>
                <span>
                  <strong
                    v-if="informationsStore.information.child.identities.includes('原住民子女')"
                  >
                    ■
                  </strong>
                  <strong v-else>□</strong>
                  原住民子女(<strong>□</strong>父<strong>□</strong>母□其他:________ )/&nbsp;
                </span>
                <span>
                  <strong
                    v-if="informationsStore.information.child.identities.includes('新住民子女')"
                  >
                    ■
                  </strong>
                  <strong v-else>□</strong>
                  新住民子女(<strong>□</strong>父<strong>□</strong>母□其他:________ )，國籍：<u
                    >&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</u
                  >/&nbsp;
                </span>
              </span>
            </p>
          </td>
        </tr>

        <!-- 檢附資料勾勾 -->
        <tr>
          <td
            style="
              width: 29.75pt;
              border-top: none;
              border-left: solid windowtext 1.5pt;
              border-bottom: solid windowtext 1pt;
              border-right: solid windowtext 1pt;
              padding: 0cm 1.4pt 0cm 1.4pt;
              layout-flow: vertical-ideographic;
              height: 74.15pt;
            "
          >
            <p
              style="
                margin-right: 5.65pt;
                margin-bottom: 0.0001pt;
                margin-left: 5.65pt;
                font-size: 16px;
                font-family: 'Times New Roman', serif;
                margin: 0cm;
                margin-top: 0cm;
                text-align: center;
                line-height: 18pt;
              "
            >
              <strong><span style="font-family: 標楷體; color: black">檢附資料</span></strong>
            </p>
          </td>
          <td
            colspan="16"
            style="
              width: 485.65pt;
              border-top: none;
              border-left: none;
              border-bottom: 1pt solid windowtext;
              border-right: 1.5pt solid windowtext;
              padding: 0cm 1.4pt;
              height: 74.15pt;
              vertical-align: top;
            "
          >
            <p
              style="
                margin-right: 0cm;
                margin-bottom: 0cm;
                margin-left: 0cm;
                font-size: 16px;
                font-family: 'Times New Roman', serif;
                margin: 0cm;
                line-height: 16pt;
              "
            >
              <span style="font-family: 標楷體; color: black">
                <span>
                  <strong v-if="transportationDocIsAttached">■</strong>
                  <strong v-else>□</strong>
                  交通費補助紀錄卡&nbsp; &nbsp;
                </span>
                <span>
                  <strong v-if="selfPayDocIsAttached">■</strong>
                  <strong v-else>□</strong>
                  療育補助紀錄卡及收據憑證單
                  <span style="background: #d9d9d9">(需貼附繳費收據正本)</span>
                </span>
              </span>
            </p>
            <p
              style="
                margin-right: 0cm;
                margin-bottom: 0cm;
                margin-left: 0cm;
                font-size: 16px;
                font-family: 'Times New Roman', serif;
                margin: 0cm;
                line-height: 16pt;
              "
            >
              <span style="font-family: 標楷體; color: black">
                <span>
                  <strong v-if="informationsStore.information.household_certificate_copies_urls">
                    ■
                  </strong>
                  <strong v-else>□</strong>戶口名簿影本&nbsp; &nbsp; &nbsp;&nbsp;
                </span>
                <span>
                  <strong v-if="informationsStore.information.postal_passbook_cover_copies_urls">
                    ■
                  </strong>
                  <strong v-else>□</strong>郵局存摺封面影本&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;
                </span>
                <span>
                  <strong v-if="informationsStore.information.low_income_certificate_copies_urls">
                    ■
                  </strong>
                  <strong v-else>□</strong>低收入戶證明
                </span>
              </span>
            </p>
            <p
              style="
                margin-right: 0cm;
                margin-bottom: 0cm;
                margin-left: 0cm;
                font-size: 16px;
                font-family: 'Times New Roman', serif;
                margin: 0cm;
                line-height: 16pt;
              "
            >
              <span style="font-family: 標楷體; color: black">
                <strong v-if="informationsStore.information.delayed_school_entry_copies_urls">
                  ■
                </strong>
                <strong v-else>□</strong>
                鑑輔會緩讀證明（達就學年齡但未入小學就讀者）
              </span>
            </p>
            <p
              style="
                margin-right: 0cm;
                margin-bottom: 0cm;
                margin-left: 0cm;
                font-size: 16px;
                font-family: 'Times New Roman', serif;
                margin: 0cm;
                line-height: 16pt;
              "
            >
              <span style="font-family: 標楷體; color: black">
                <span>
                  <strong v-if="informationsStore.information.household_certificate_copies_urls">
                    ■
                  </strong>
                  <strong v-else>□</strong>1.(疑似)發展遲緩證明書影本 (開立日起一年內有效)&nbsp;
                </span>
                <span>
                  <strong v-if="informationsStore.information.household_certificate_copies_urls">
                    ■
                  </strong>
                  <strong v-else>□</strong>聯合評估中心綜合報告書影本
                </span>
              </span>
              <!-- <strong>□</strong><span style="font-family: 標楷體; color: black"></span
              ><span style="font-family: 標楷體; color: black"
                >1.(疑似)發展遲緩證明書影本（開立日起一年內有效）<strong>□2.</strong>聯合評估中心綜合報告書影本</span
              > -->
            </p>
            <p
              style="
                margin-right: 0cm;
                margin-bottom: 0cm;
                margin-left: 0cm;
                font-size: 16px;
                font-family: 'Times New Roman', serif;
                margin: 0cm;
                line-height: 16pt;
              "
            >
              <span style="font-family: 標楷體; color: black">
                <strong v-if="informationsStore.information.disability_identification_copies_urls">
                  ■
                </strong>
                <strong v-else>□</strong>
                3.身心障礙證明影本&nbsp;
              </span>
              <strong style="background: #d9d9d9; font-family: 標楷體; color: black">
                (註:1.2.3.請擇一檢附)
              </strong>
            </p>
          </td>
        </tr>

        <!-- 郵局帳號 -->
        <tr>
          <td
            style="
              width: 29.75pt;
              border-top: none;
              border-left: solid windowtext 1.5pt;
              border-bottom: solid windowtext 1pt;
              border-right: solid windowtext 1pt;
              padding: 0cm 1.4pt 0cm 1.4pt;
              height: 34pt;
            "
          >
            <p
              style="
                margin-right: 0cm;
                margin-bottom: 0cm;
                margin-left: 0cm;
                font-size: 16px;
                font-family: 'Times New Roman', serif;
                margin: 0cm;
                text-align: center;
                line-height: 15pt;
              "
            >
              <strong><span style="font-family: 標楷體; color: black">郵局帳號</span></strong>
            </p>
          </td>

          <!-- 戶名 -->
          <td
            style="
              width: 35.45pt;
              border-top: none;
              border-left: none;
              border-bottom: solid windowtext 1pt;
              border-right: solid windowtext 1pt;
              padding: 0cm 1.4pt 0cm 1.4pt;
              height: 34pt;
            "
          >
            <p
              style="
                margin-right: 0cm;
                margin-bottom: 0cm;
                margin-left: 0cm;
                font-size: 16px;
                font-family: 'Times New Roman', serif;
                margin: 0cm;
                text-align: center;
                line-height: 15pt;
              "
            >
              <span style="font-family: 標楷體; color: black">戶名</span>
            </p>
          </td>
          <td
            id="account_name"
            style="
              width: 3cm;
              border-top: none;
              border-left: none;
              border-bottom: solid windowtext 1pt;
              border-right: solid windowtext 1pt;
              padding: 0cm 1.4pt 0cm 1.4pt;
              height: 34pt;
            "
          >
            <p
              style="
                margin-right: 0cm;
                margin-bottom: 0cm;
                margin-left: 0cm;
                font-size: 16px;
                font-family: 'Times New Roman', serif;
                margin: 0cm;
                text-align: center;
                line-height: 15pt;
              "
            >
              <span class="text-blue-9" style="font-family:">{{
                informationsStore.information?.postal_bank_account?.account_name
              }}</span>
            </p>
          </td>

          <!-- [身分證字號] -->
          <td
            colspan="2"
            style="
              width: 35.45pt;
              border-top: none;
              border-left: none;
              border-bottom: solid windowtext 1pt;
              border-right: solid windowtext 1pt;
              padding: 0cm 1.4pt 0cm 1.4pt;
              height: 34pt;
            "
          >
            <p
              style="
                margin-right: 0cm;
                margin-bottom: 0cm;
                margin-left: 0cm;
                font-size: 16px;
                font-family: 'Times New Roman', serif;
                margin: 0cm;
                text-align: center;
                line-height: 15pt;
              "
            >
              <span style="font-family: 標楷體; color: black">身分證</span
              ><span style="font-family: 標楷體; color: black">字 號</span>
            </p>
          </td>
          <td
            id="pb_national_id_number"
            colspan="4"
            style="
              width: 90.4pt;
              border-top: none;
              border-left: none;
              border-bottom: solid windowtext 1pt;
              border-right: solid windowtext 1pt;
              padding: 0cm 1.4pt 0cm 1.4pt;
              height: 34pt;
            "
          >
            <p
              style="
                margin-right: 0cm;
                margin-bottom: 0cm;
                margin-left: 0cm;
                font-size: 16px;
                font-family: 'Times New Roman', serif;
                margin: 0cm;
                text-align: center;
                line-height: 15pt;
              "
            >
              <span class="text-blue-9" style="font-family: 標楷體">{{
                informationsStore.information?.postal_bank_account?.national_id_number
              }}</span>
            </p>
          </td>

          <!-- 局號 -->
          <td
            colspan="2"
            style="
              width: 30.1pt;
              border-top: none;
              border-left: none;
              border-bottom: solid windowtext 1pt;
              border-right: solid windowtext 1pt;
              padding: 0cm 1.4pt 0cm 1.4pt;
              height: 34pt;
            "
          >
            <p
              style="
                margin-right: 0cm;
                margin-bottom: 0cm;
                margin-left: 0cm;
                font-size: 16px;
                font-family: 'Times New Roman', serif;
                margin: 0cm;
                text-align: center;
                line-height: 15pt;
              "
            >
              <span style="font-family: 標楷體; color: black">局號</span>
            </p>
          </td>
          <td
            id="office_code"
            colspan="4"
            style="
              width: 89.55pt;
              border-top: none;
              border-left: none;
              border-bottom: solid windowtext 1pt;
              border-right: solid windowtext 1pt;
              padding: 0cm 1.4pt 0cm 1.4pt;
              height: 34pt;
            "
          >
            <p
              style="
                margin-right: 0cm;
                margin-bottom: 0cm;
                margin-left: 0cm;
                font-size: 16px;
                font-family: 'Times New Roman', serif;
                margin: 0cm;
                text-align: center;
                line-height: 15pt;
              "
            >
              <span class="text-blue-9" style="font-family: 標楷體">{{
                informationsStore.information?.postal_bank_account?.office_code
              }}</span>
            </p>
          </td>
          <!-- 帳號 -->
          <td
            style="
              width: 30.9pt;
              border-top: none;
              border-left: none;
              border-bottom: solid windowtext 1pt;
              border-right: solid windowtext 1pt;
              padding: 0cm 1.4pt 0cm 1.4pt;
              height: 34pt;
            "
          >
            <p
              style="
                margin-right: 0cm;
                margin-bottom: 0cm;
                margin-left: 0cm;
                font-size: 16px;
                font-family: 'Times New Roman', serif;
                margin: 0cm;
                text-align: center;
                line-height: 15pt;
              "
            >
              <span style="font-family: 標楷體; color: black">帳號</span>
            </p>
          </td>
          <td
            id="account_code_number"
            style="
              width: 88.75pt;
              border-top: none;
              border-left: none;
              border-bottom: solid windowtext 1pt;
              border-right: solid windowtext 1.5pt;
              padding: 0cm 1.4pt 0cm 1.4pt;
              height: 34pt;
            "
          >
            <p
              style="
                margin-right: 0cm;
                margin-bottom: 0cm;
                margin-left: 0cm;
                font-size: 16px;
                font-family: 'Times New Roman', serif;
                margin: 0cm;
                text-align: center;
                line-height: 18pt;
              "
            >
              <span class="text-blue-9" style="font-family: 標楷體">{{
                informationsStore.information?.postal_bank_account?.account_code_number
              }}</span>
            </p>
          </td>
        </tr>
        <tr>
          <td
            style="
              width: 29.75pt;
              border-top: none;
              border-left: solid windowtext 1.5pt;
              border-bottom: solid windowtext 1pt;
              border-right: solid windowtext 1pt;
              padding: 0cm 1.4pt 0cm 1.4pt;
              height: 66.5pt;
            "
          >
            <p
              style="
                margin-right: 0cm;
                margin-bottom: 0cm;
                margin-left: 0cm;
                font-size: 16px;
                font-family: 'Times New Roman', serif;
                margin: 0cm;
                text-align: center;
                line-height: 14pt;
              "
            >
              <strong><span style="font-family: 標楷體; color: black">注意事項</span></strong>
            </p>
          </td>
          <td
            colspan="16"
            style="
              width: 485.65pt;
              border-top: none;
              border-left: none;
              border-bottom: solid windowtext 1pt;
              border-right: solid windowtext 1.5pt;
              padding: 0cm 1.4pt 0cm 1.4pt;
              height: 66.5pt;
            "
          >
            <div style="margin: 0cm; font-size: 16px; font-family: 'Times New Roman', serif">
              <ol style="margin-bottom: 0cm" type="1">
                <li style="margin: 0cm; font-size: 16px; font-family: 'Times New Roman', serif">
                  <strong
                    ><span style="font-family: 標楷體; font-size: 13px; color: black"
                      >本人已詳讀本表及補助計畫內容，且據實提供各項資料文件，並確認兒童未領有臺南市「身心障礙者日間照顧及住宿式照顧費用補助」、「弱勢兒童及少年醫療費用補助」等相同性質之其他補助及確認兒童「尚未在本市任一家早療機構接受療育並申請療育金」。如違反上述情形，繳回已領之補助並願負法律責任。</span
                    ></strong
                  >
                </li>
                <li style="margin: 0cm; font-size: 16px; font-family: 'Times New Roman', serif">
                  <strong
                    ><span style="font-family: 標楷體; font-size: 13px; color: black"
                      >本補助同1個月份僅受理申請1次，如須申請兩間以上療育單位，同月份之補助費用須合併申請，已申請過之月份不論補助費用是否已達上限，均不再受理第2次申請。</span
                    ></strong
                  >
                </li>
                <li style="margin: 0cm; font-size: 16px; font-family: 'Times New Roman', serif">
                  <strong
                    ><span style="font-family: 標楷體; font-size: 13px; color: black"
                      >本人同意社會局調查本案所需戶籍、身心障礙及低收入戶資格與緩讀身分等相關資料並同意配合訪視或寄送福利資訊。</span
                    ></strong
                  >
                </li>
                <li style="margin: 0cm; font-size: 16px; font-family: 'Times New Roman', serif">
                  <strong
                    ><span style="font-family: 標楷體; font-size: 13px; color: black"
                      >性別欄位之「其他」係指在二元性別「男」、「女」以外，提供開放性選項，包括雙性人、跨性別等。</span
                    ></strong
                  >
                </li>
              </ol>
            </div>
          </td>
        </tr>
        <tr>
          <td
            rowspan="5"
            style="
              width: 29.75pt;
              border-top: none;
              border-left: solid windowtext 1.5pt;
              border-bottom: solid windowtext 1pt;
              border-right: solid windowtext 1pt;
              padding: 0cm 1.4pt 0cm 1.4pt;
              height: 1cm;
            "
          >
            <p
              style="
                margin-right: 5.65pt;
                margin-bottom: 0.0001pt;
                margin-left: 5.65pt;
                font-size: 16px;
                font-family: 'Times New Roman', serif;
                margin: 0cm;
                margin-top: 0cm;
                text-align: center;
                line-height: 18pt;
              "
            >
              <strong><span style="font-family: 標楷體; color: black">區公所初核結果</span></strong>
            </p>
          </td>
          <td
            style="
              width: 35.45pt;
              border-top: none;
              border-left: none;
              border-bottom: solid windowtext 1pt;
              border-right: solid windowtext 1pt;
              padding: 0cm 1.4pt 0cm 1.4pt;
              height: 1cm;
            "
          >
            <p
              style="
                margin-right: 0cm;
                margin-bottom: 0cm;
                margin-left: 0cm;
                font-size: 16px;
                font-family: 'Times New Roman', serif;
                margin: 0cm;
                text-align: center;
                line-height: 18pt;
              "
            >
              <span style="font-family: 標楷體; color: black">項目</span>
            </p>
          </td>
          <td
            colspan="5"
            style="
              width: 6cm;
              border-top: none;
              border-left: none;
              border-bottom: solid windowtext 1pt;
              border-right: solid windowtext 1pt;
              padding: 0cm 1.4pt 0cm 1.4pt;
              height: 1cm;
            "
          >
            <p
              style="
                margin-right: 0cm;
                margin-bottom: 0cm;
                margin-left: 0cm;
                font-size: 16px;
                font-family: 'Times New Roman', serif;
                margin: 0cm;
                text-align: center;
                line-height: 18pt;
              "
            >
              <span style="font-family: 標楷體; color: black">交通費補助(元)</span>
            </p>
          </td>
          <td
            colspan="6"
            style="
              width: 127.6pt;
              border-top: none;
              border-left: none;
              border-bottom: solid windowtext 1pt;
              border-right: solid windowtext 1pt;
              padding: 0cm 1.4pt 0cm 1.4pt;
              height: 1cm;
            "
          >
            <p
              style="
                margin-right: 0cm;
                margin-bottom: 0cm;
                margin-left: 0cm;
                font-size: 16px;
                font-family: 'Times New Roman', serif;
                margin: 0cm;
                text-align: center;
                line-height: 18pt;
              "
            >
              <span style="font-family: 標楷體; color: black">療育費補助(元)</span>
            </p>
          </td>
          <td
            colspan="4"
            rowspan="3"
            style="
              width: 152.5pt;
              border-top: none;
              border-left: none;
              border-bottom: solid windowtext 1pt;
              border-right: solid windowtext 1.5pt;
              padding: 0cm 1.4pt 0cm 1.4pt;
              height: 1cm;
            "
          >
            <p
              style="
                margin-right: 0cm;
                margin-bottom: 0cm;
                margin-left: 0cm;
                font-size: 16px;
                font-family: 'Times New Roman', serif;
                margin: 0cm;
                line-height: 18pt;
              "
            >
              <strong><span style="font-family: 標楷體; color: black">立切結書人:</span></strong>
            </p>
            <p
              style="
                margin-right: 0cm;
                margin-bottom: 0cm;
                margin-left: 0cm;
                font-size: 16px;
                font-family: 'Times New Roman', serif;
                margin: 0cm;
              "
            >
              &nbsp;
            </p>
            <p
              style="
                margin-right: 0cm;
                margin-bottom: 0cm;
                margin-left: 0cm;
                font-size: 16px;
                font-family: 'Times New Roman', serif;
                margin: 0cm;
                line-height: 18pt;
              "
            >
              <span style="font-family: 標楷體; color: black">&nbsp;</span>
            </p>
            <p
              style="
                margin-right: 0cm;
                margin-bottom: 0cm;
                margin-left: 0cm;
                font-size: 16px;
                font-family: 'Times New Roman', serif;
                margin: 0cm;
                line-height: 18pt;
              "
            >
              <span style="font-size: 9px; font-family: 標楷體; color: black">(</span
              ><span style="font-size: 11px; font-family: 標楷體; color: black"
                >本人已詳閱注意事項並<strong>親自簽名或蓋章</strong>)</span
              >
            </p>
          </td>
        </tr>
        <tr v-for="monthlyData in summaryFromParent" :key="monthlyData.month">
          <!-- month  -->
          <td
            id="month_0"
            style="
              width: 35.45pt;
              border-top: none;
              border-left: none;
              border-bottom: solid windowtext 1pt;
              border-right: solid windowtext 1pt;
              padding: 0cm 1.4pt 0cm 1.4pt;
              height: 1cm;
              text-align: right;
            "
          >
            <p
              style="
                margin-right: 0cm;
                margin-bottom: 0cm;
                margin-left: 0cm;
                font-size: 16px;
                font-family: 'Times New Roman', serif;
                margin: 0cm;
                text-align: right;
                line-height: 18pt;
              "
            >
              <span style="font-family: 標楷體">
                <span class="text-blue-9">{{ monthlyData.month }}</span> 月
              </span>
            </p>
          </td>
          <td
            id="transportation_count_0"
            colspan="5"
            style="
              text-align: right;
              width: 6cm;
              border-top: none;
              border-left: none;
              border-bottom: solid windowtext 1pt;
              border-right: solid windowtext 1pt;
              padding: 0cm 1.4pt 0cm 1.4pt;
              height: 1cm;
            "
          >
            <p
              style="
                margin-right: 0cm;
                margin-bottom: 0cm;
                margin-left: 0cm;
                font-size: 16px;
                font-family: 'Times New Roman', serif;
                margin: 0cm;
                text-align: right;
                line-height: 18pt;
              "
            >
              <span style="font-family: 標楷體; color: black">
                <span class="text-blue-9">{{ monthlyData.transportationCount }}</span
                >&nbsp;次&times;&nbsp; 200 &nbsp;元，共計&nbsp;
                <span class="text-blue-9">{{
                  monthlyData.transportationCount * subsidyRule.transportationFee
                }}</span>
                &nbsp;元&nbsp;</span
              >
            </p>
          </td>
          <td
            id="self_pay_programs_total_0"
            colspan="6"
            style="
              text-align: right;
              width: 127.6pt;
              border-top: none;
              border-left: none;
              border-bottom: solid windowtext 1pt;
              border-right: solid windowtext 1pt;
              padding: 0cm 1.4pt 0cm 1.4pt;
              height: 1cm;
            "
          >
            <p
              style="
                margin-right: 0cm;
                margin-bottom: 0cm;
                margin-left: 0cm;
                font-size: 16px;
                font-family: 'Times New Roman', serif;
                margin: 0cm;
                text-align: center;
                line-height: 18pt;
              "
            >
              <u>
                <span style="font-family: 標楷體; color: black">
                  &nbsp;
                  <span class="text-blue-9">{{ monthlyData.selfPayProgramsTotal }}</span>
                  &nbsp;元
                </span>
              </u>
            </p>
          </td>
        </tr>

        <tr>
          <td
            id="month_2"
            style="
              text-align: right;
              width: 35.45pt;
              border-top: none;
              border-left: none;
              border-bottom: solid windowtext 1pt;
              border-right: solid windowtext 1pt;
              padding: 0cm 1.4pt 0cm 1.4pt;
              height: 1cm;
            "
          >
            <p
              style="
                margin-right: 0cm;
                margin-bottom: 0cm;
                margin-left: 0cm;
                font-size: 16px;
                font-family: 'Times New Roman', serif;
                margin: 0cm;
                text-align: right;
                line-height: 18pt;
              "
            >
              <span style="font-family: 標楷體; color: black">月</span>
            </p>
          </td>
          <td
            id="transportation_count_2"
            colspan="5"
            style="
              text-align: right;
              width: 6cm;
              border-top: none;
              border-left: none;
              border-bottom: solid windowtext 1pt;
              border-right: solid windowtext 1pt;
              padding: 0cm 1.4pt 0cm 1.4pt;
              height: 1cm;
            "
          >
            <p
              style="
                margin-right: 0cm;
                margin-bottom: 0cm;
                margin-left: 0cm;
                font-size: 16px;
                font-family: 'Times New Roman', serif;
                margin: 0cm;
                text-align: right;
                line-height: 18pt;
              "
            >
              <span style="font-family: 標楷體; color: black"
                >次&times;&nbsp; &nbsp; &nbsp;元，共計&nbsp; &nbsp; &nbsp; &nbsp;元</span
              >
            </p>
          </td>
          <td
            id="self_pay_programs_total_2"
            colspan="6"
            style="
              width: 127.6pt;
              border-top: none;
              border-left: none;
              border-bottom: solid windowtext 1pt;
              border-right: solid windowtext 1pt;
              padding: 0cm 1.4pt 0cm 1.4pt;
              height: 1cm;
            "
          >
            <p
              style="
                margin-right: 0cm;
                margin-bottom: 0cm;
                margin-left: 0cm;
                font-size: 16px;
                font-family: 'Times New Roman', serif;
                margin: 0cm;
                text-align: center;
                line-height: 18pt;
              "
            >
              <u
                ><span style="font-family: 標楷體; color: black"
                  >&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</span
                ></u
              ><span style="font-family: 標楷體; color: black">元</span>
            </p>
          </td>
          <!-- 初核結果 -->
          <td
            id="init_result"
            colspan="4"
            rowspan="2"
            style="
              width: 152.5pt;
              border-top: none;
              border-left: none;
              border-bottom: solid windowtext 1pt;
              border-right: solid windowtext 1.5pt;
              padding: 0cm 1.4pt 0cm 1.4pt;
              height: 1cm;
              font-family: 標楷體;
            "
          >
            <p
              style="
                margin-right: 0cm;
                margin-bottom: 0cm;
                margin-left: 0cm;
                font-size: 16px;
                font-family: 'Times New Roman', serif;
                margin: 0cm;
                line-height: 18pt;
              "
            >
              <span style="font-size: 15px; font-family: 標楷體; color: black">初核結果:</span>
            </p>
            <p
              style="
                margin-right: 0cm;
                margin-bottom: 0cm;
                margin-left: 0cm;
                font-size: 16px;
                font-family: 'Times New Roman', serif;
                margin: 0cm;
                line-height: 18pt;
              "
            >
              <span style="font-size: 15px; font-family: 標楷體; color: black">
                <u>
                  <span class="text-blue-9">{{ subsidyPeriod.startYear }} </span>
                </u>
                年
                <u>
                  <span class="text-blue-9">{{ subsidyPeriod.startMonth }}</span>
                </u>
                月至
                <u
                  ><span class="text-blue-9">{{ subsidyPeriod.endYear }}</span>
                </u>
                年
                <u
                  ><span class="text-blue-9"> {{ subsidyPeriod.endMonth }}</span>
                </u>
                月
              </span>
            </p>
            <p
              style="
                margin-right: 0cm;
                margin-bottom: 0cm;
                margin-left: 0cm;
                font-size: 16px;
                font-family: 'Times New Roman', serif;
                margin: 0cm;
                line-height: 18pt;
              "
            >
              <span style="font-size: 15px; font-family: 標楷體; color: black">
                同意補助
                <span class="text-blue-9" style="text-decoration: underline">{{
                  totalAmount
                }}</span>
                元。
              </span>
            </p>
          </td>
        </tr>
        <tr>
          <td
            id="month_3"
            style="
              text-align: right;
              width: 35.45pt;
              border-top: none;
              border-left: none;
              border-bottom: solid windowtext 1pt;
              border-right: solid windowtext 1pt;
              padding: 0cm 1.4pt 0cm 1.4pt;
              height: 1cm;
            "
          >
            <p
              style="
                margin-right: 0cm;
                margin-bottom: 0cm;
                margin-left: 0cm;
                font-size: 16px;
                font-family: 'Times New Roman', serif;
                margin: 0cm;
                text-align: right;
                line-height: 18pt;
              "
            >
              <span style="font-family: 標楷體; color: black">月</span>
            </p>
          </td>
          <td
            id="transportation_count_3"
            colspan="5"
            style="
              width: 6cm;
              border-top: none;
              border-left: none;
              border-bottom: solid windowtext 1pt;
              border-right: solid windowtext 1pt;
              padding: 0cm 1.4pt 0cm 1.4pt;
              height: 1cm;
            "
          >
            <p
              style="
                margin-right: 0cm;
                margin-bottom: 0cm;
                margin-left: 0cm;
                font-size: 16px;
                font-family: 'Times New Roman', serif;
                margin: 0cm;
                text-align: right;
                line-height: 18pt;
              "
            >
              <span style="font-family: 標楷體; color: black"
                >次&times;&nbsp; &nbsp; &nbsp;元，共計&nbsp; &nbsp; &nbsp; &nbsp;元</span
              >
            </p>
          </td>
          <td
            id="self_pay_programs_total_3"
            colspan="6"
            style="
              width: 127.6pt;
              border-top: none;
              border-left: none;
              border-bottom: solid windowtext 1pt;
              border-right: solid windowtext 1pt;
              padding: 0cm 1.4pt 0cm 1.4pt;
              height: 1cm;
              text-align: right;
            "
          >
            <p
              style="
                margin-right: 0cm;
                margin-bottom: 0cm;
                margin-left: 0cm;
                font-size: 16px;
                font-family: 'Times New Roman', serif;
                margin: 0cm;
                text-align: center;
                line-height: 18pt;
              "
            >
              <u
                ><span style="font-family: 標楷體; color: black"
                  >&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</span
                ></u
              ><span style="font-family: 標楷體; color: black">元</span>
            </p>
          </td>
        </tr>
        <tr>
          <td
            colspan="17"
            style="
              width: 515.4pt;
              border-top: none;
              border-left: 1.5pt solid windowtext;
              border-bottom: 1pt solid windowtext;
              border-right: 1.5pt solid windowtext;
              padding: 0cm 1.4pt;
              height: 25.9pt;
              vertical-align: top;
            "
          >
            <p
              style="
                margin-right: 0cm;
                margin-bottom: 0cm;
                margin-left: 0cm;
                font-size: 16px;
                font-family: 'Times New Roman', serif;
                margin: 0cm;
                text-align: justify;
                line-height: 18pt;
              "
            >
              <span style="font-family: 標楷體; color: black">&nbsp; &nbsp;</span
              ><span style="font-size: 15px; font-family: 標楷體; color: black"
                >承辦人核章：&nbsp; &nbsp;</span
              ><span style="font-size: 13px; font-family: 標楷體; color: black"
                >&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</span
              ><span style="font-size: 15px; font-family: 標楷體; color: black">&nbsp;</span
              ><span style="font-size: 15px; font-family: 標楷體; color: black"
                >課長核章：&nbsp; &nbsp; &nbsp;</span
              ><span style="font-size: 13px; font-family: 標楷體; color: black"
                >&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</span
              ><span style="font-size: 15px; font-family: 標楷體; color: black"
                >&nbsp; &nbsp; &nbsp;</span
              ><span style="font-size: 15px; font-family: 標楷體; color: black">區長核章：</span>
            </p>
          </td>
        </tr>
        <tr>
          <td
            rowspan="5"
            style="
              width: 29.75pt;
              border-top: none;
              border-left: solid windowtext 1.5pt;
              border-bottom: solid windowtext 1pt;
              border-right: solid windowtext 1pt;
              padding: 0cm 1.4pt 0cm 1.4pt;
              height: 22.05pt;
            "
          >
            <p
              style="
                margin-right: 5.65pt;
                margin-bottom: 0.0001pt;
                margin-left: 5.65pt;
                font-size: 16px;
                font-family: 'Times New Roman', serif;
                margin: 0cm;
                margin-top: 0cm;
                text-align: center;
                line-height: 18pt;
              "
            >
              <strong><span style="font-family: 標楷體; color: black">社會局複核結果</span></strong>
            </p>
          </td>
          <td
            style="
              width: 35.45pt;
              border-top: none;
              border-left: none;
              border-bottom: solid windowtext 1pt;
              border-right: solid windowtext 1pt;
              padding: 0cm 1.4pt 0cm 1.4pt;
              height: 22.05pt;
            "
          >
            <p
              style="
                margin-right: 0cm;
                margin-bottom: 0cm;
                margin-left: 0cm;
                font-size: 16px;
                font-family: 'Times New Roman', serif;
                margin: 0cm;
                text-align: center;
                line-height: 18pt;
              "
            >
              <span style="font-family: 標楷體; color: black">項目</span>
            </p>
          </td>
          <td
            colspan="5"
            style="
              width: 6cm;
              border-top: none;
              border-left: none;
              border-bottom: solid windowtext 1pt;
              border-right: solid windowtext 1pt;
              padding: 0cm 1.4pt 0cm 1.4pt;
              height: 22.05pt;
            "
          >
            <p
              style="
                margin-right: 0cm;
                margin-bottom: 0cm;
                margin-left: 0cm;
                font-size: 16px;
                font-family: 'Times New Roman', serif;
                margin: 0cm;
                text-align: center;
                line-height: 18pt;
              "
            >
              <span style="font-family: 標楷體; color: black">交通費補助(元)</span>
            </p>
          </td>
          <td
            colspan="6"
            style="
              width: 127.6pt;
              border-top: none;
              border-left: none;
              border-bottom: solid windowtext 1pt;
              border-right: solid windowtext 1pt;
              padding: 0cm 1.4pt 0cm 1.4pt;
              height: 22.05pt;
            "
          >
            <p
              style="
                margin-right: 0cm;
                margin-bottom: 0cm;
                margin-left: 0cm;
                font-size: 16px;
                font-family: 'Times New Roman', serif;
                margin: 0cm;
                text-align: center;
                line-height: 18pt;
              "
            >
              <span style="font-family: 標楷體; color: black">療育費補助(元)</span>
            </p>
          </td>
          <td
            colspan="4"
            style="
              width: 152.5pt;
              border-top: none;
              border-left: none;
              border-bottom: solid windowtext 1pt;
              border-right: solid windowtext 1.5pt;
              padding: 0cm 1.4pt 0cm 1.4pt;
              height: 22.05pt;
            "
          >
            <p
              style="
                margin-right: 0cm;
                margin-bottom: 0cm;
                margin-left: 0cm;
                font-size: 16px;
                font-family: 'Times New Roman', serif;
                margin: 0cm;
                text-align: center;
                line-height: 18pt;
              "
            >
              <span style="font-family: 標楷體; color: black">複核結果</span>
            </p>
          </td>
        </tr>
        <tr>
          <td
            style="
              width: 35.45pt;
              border-top: none;
              border-left: none;
              border-bottom: solid windowtext 1pt;
              border-right: solid windowtext 1pt;
              padding: 0cm 1.4pt 0cm 1.4pt;
              height: 1cm;
            "
          >
            <p
              style="
                margin-right: 0cm;
                margin-bottom: 0cm;
                margin-left: 0cm;
                font-size: 16px;
                font-family: 'Times New Roman', serif;
                margin: 0cm;
                text-align: right;
                line-height: 18pt;
              "
            >
              <span style="font-family: 標楷體; color: black">月</span>
            </p>
          </td>
          <td
            colspan="5"
            style="
              width: 6cm;
              border-top: none;
              border-left: none;
              border-bottom: solid windowtext 1pt;
              border-right: solid windowtext 1pt;
              padding: 0cm 1.4pt 0cm 1.4pt;
              height: 1cm;
            "
          >
            <p
              style="
                margin-right: 0cm;
                margin-bottom: 0cm;
                margin-left: 0cm;
                font-size: 16px;
                font-family: 'Times New Roman', serif;
                margin: 0cm;
                text-align: right;
                line-height: 18pt;
              "
            >
              <span style="font-family: 標楷體; color: black"
                >次&times;&nbsp; &nbsp; &nbsp;元，共計&nbsp; &nbsp; &nbsp; &nbsp;元&nbsp;</span
              >
            </p>
          </td>
          <td
            colspan="6"
            style="
              width: 127.6pt;
              border-top: none;
              border-left: none;
              border-bottom: solid windowtext 1pt;
              border-right: solid windowtext 1pt;
              padding: 0cm 1.4pt 0cm 1.4pt;
              height: 1cm;
            "
          >
            <p
              style="
                margin-right: 0cm;
                margin-bottom: 0cm;
                margin-left: 0cm;
                font-size: 16px;
                font-family: 'Times New Roman', serif;
                margin: 0cm;
                text-align: center;
                line-height: 18pt;
              "
            >
              <u
                ><span style="font-family: 標楷體; color: black"
                  >&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</span
                ></u
              ><span style="font-family: 標楷體; color: black">元</span>
            </p>
          </td>
          <td
            colspan="4"
            rowspan="4"
            style="
              width: 152.5pt;
              border-top: none;
              border-left: none;
              border-bottom: solid windowtext 1.5pt;
              border-right: solid windowtext 1.5pt;
              padding: 0cm 1.4pt 0cm 1.4pt;
              height: 1cm;
            "
          >
            <p
              style="
                margin-right: 0cm;
                margin-bottom: 0cm;
                margin-left: 0cm;
                font-size: 16px;
                font-family: 'Times New Roman', serif;
                margin: 0cm;
                line-height: 26pt;
              "
            >
              <span style="font-size: 15px; font-family: 標楷體; color: black">&nbsp;</span>
            </p>
            <p
              style="
                margin-right: 0cm;
                margin-bottom: 0cm;
                margin-left: 0cm;
                font-size: 16px;
                font-family: 'Times New Roman', serif;
                margin: 0cm;
                line-height: 18pt;
              "
            >
              <span style="font-size: 15px; font-family: 標楷體; color: black">____</span
              ><span style="font-size: 15px; font-family: 標楷體; color: black"
                >年____月至____年_____月</span
              >
            </p>
            <p
              style="
                margin-right: 0cm;
                margin-bottom: 0cm;
                margin-left: 0cm;
                font-size: 16px;
                font-family: 'Times New Roman', serif;
                margin: 0cm;
                line-height: 26pt;
              "
            >
              <span style="font-size: 15px; font-family: 標楷體; color: black"
                >同意補助_________元。</span
              >
            </p>
            <p
              style="
                margin-right: 0cm;
                margin-bottom: 0cm;
                margin-left: 0cm;
                font-size: 16px;
                font-family: 'Times New Roman', serif;
                margin: 0cm;
                line-height: 26pt;
              "
            >
              <span style="font-family: 標楷體; color: black">&nbsp;</span>
            </p>
          </td>
        </tr>
        <tr>
          <td
            style="
              width: 35.45pt;
              border-top: none;
              border-left: none;
              border-bottom: solid windowtext 1pt;
              border-right: solid windowtext 1pt;
              padding: 0cm 1.4pt 0cm 1.4pt;
              height: 1cm;
            "
          >
            <p
              style="
                margin-right: 0cm;
                margin-bottom: 0cm;
                margin-left: 0cm;
                font-size: 16px;
                font-family: 'Times New Roman', serif;
                margin: 0cm;
                text-align: right;
                line-height: 18pt;
              "
            >
              <span style="font-family: 標楷體; color: black">月</span>
            </p>
          </td>
          <td
            colspan="5"
            style="
              width: 6cm;
              border-top: none;
              border-left: none;
              border-bottom: solid windowtext 1pt;
              border-right: solid windowtext 1pt;
              padding: 0cm 1.4pt 0cm 1.4pt;
              height: 1cm;
            "
          >
            <p
              style="
                margin-right: 0cm;
                margin-bottom: 0cm;
                margin-left: 0cm;
                font-size: 16px;
                font-family: 'Times New Roman', serif;
                margin: 0cm;
                text-align: right;
                line-height: 18pt;
              "
            >
              <span style="font-family: 標楷體; color: black"
                >次&times;&nbsp; &nbsp; &nbsp;元，共計&nbsp; &nbsp; &nbsp; &nbsp;元&nbsp;</span
              >
            </p>
          </td>
          <td
            colspan="6"
            style="
              width: 127.6pt;
              border-top: none;
              border-left: none;
              border-bottom: solid windowtext 1pt;
              border-right: solid windowtext 1pt;
              padding: 0cm 1.4pt 0cm 1.4pt;
              height: 1cm;
            "
          >
            <p
              style="
                margin-right: 0cm;
                margin-bottom: 0cm;
                margin-left: 0cm;
                font-size: 16px;
                font-family: 'Times New Roman', serif;
                margin: 0cm;
                text-align: center;
                line-height: 18pt;
              "
            >
              <u
                ><span style="font-family: 標楷體; color: black"
                  >&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</span
                ></u
              ><span style="font-family: 標楷體; color: black">元</span>
            </p>
          </td>
        </tr>
        <tr>
          <td
            style="
              width: 35.45pt;
              border-top: none;
              border-left: none;
              border-bottom: solid windowtext 1pt;
              border-right: solid windowtext 1pt;
              padding: 0cm 1.4pt 0cm 1.4pt;
              height: 1cm;
            "
          >
            <p
              style="
                margin-right: 0cm;
                margin-bottom: 0cm;
                margin-left: 0cm;
                font-size: 16px;
                font-family: 'Times New Roman', serif;
                margin: 0cm;
                text-align: right;
                line-height: 18pt;
              "
            >
              <span style="font-family: 標楷體; color: black">月</span>
            </p>
          </td>
          <td
            colspan="5"
            style="
              width: 6cm;
              border-top: none;
              border-left: none;
              border-bottom: solid windowtext 1pt;
              border-right: solid windowtext 1pt;
              padding: 0cm 1.4pt 0cm 1.4pt;
              height: 1cm;
            "
          >
            <p
              style="
                margin-right: 0cm;
                margin-bottom: 0cm;
                margin-left: 0cm;
                font-size: 16px;
                font-family: 'Times New Roman', serif;
                margin: 0cm;
                text-align: right;
                line-height: 18pt;
              "
            >
              <span style="font-family: 標楷體; color: black"
                >次&times;&nbsp; &nbsp; &nbsp;元，共計&nbsp; &nbsp; &nbsp; &nbsp;元&nbsp;</span
              >
            </p>
          </td>
          <td
            colspan="6"
            style="
              width: 127.6pt;
              border-top: none;
              border-left: none;
              border-bottom: solid windowtext 1pt;
              border-right: solid windowtext 1pt;
              padding: 0cm 1.4pt 0cm 1.4pt;
              height: 1cm;
            "
          >
            <p
              style="
                margin-right: 0cm;
                margin-bottom: 0cm;
                margin-left: 0cm;
                font-size: 16px;
                font-family: 'Times New Roman', serif;
                margin: 0cm;
                text-align: center;
                line-height: 18pt;
              "
            >
              <u
                ><span style="font-family: 標楷體; color: black"
                  >&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</span
                ></u
              ><span style="font-family: 標楷體; color: black">元</span>
            </p>
          </td>
        </tr>
        <tr>
          <td
            style="
              width: 35.45pt;
              border-top: none;
              border-left: none;
              border-bottom: solid windowtext 1.5pt;
              border-right: solid windowtext 1pt;
              padding: 0cm 1.4pt 0cm 1.4pt;
              height: 1cm;
            "
          >
            <p
              style="
                margin-right: 0cm;
                margin-bottom: 0cm;
                margin-left: 0cm;
                font-size: 16px;
                font-family: 'Times New Roman', serif;
                margin: 0cm;
                text-align: right;
                line-height: 18pt;
              "
            >
              <span style="font-family: 標楷體; color: black">月</span>
            </p>
          </td>
          <td
            colspan="5"
            style="
              width: 6cm;
              border-top: none;
              border-left: none;
              border-bottom: solid windowtext 1.5pt;
              border-right: solid windowtext 1pt;
              padding: 0cm 1.4pt 0cm 1.4pt;
              height: 1cm;
            "
          >
            <p
              style="
                margin-right: 0cm;
                margin-bottom: 0cm;
                margin-left: 0cm;
                font-size: 16px;
                font-family: 'Times New Roman', serif;
                margin: 0cm;
                text-align: right;
                line-height: 18pt;
              "
            >
              <span style="font-family: 標楷體; color: black"
                >次&times;&nbsp; &nbsp; &nbsp;元，共計&nbsp; &nbsp; &nbsp; &nbsp;元</span
              >
            </p>
          </td>
          <td
            colspan="6"
            style="
              width: 127.6pt;
              border-top: none;
              border-left: none;
              border-bottom: solid windowtext 1.5pt;
              border-right: solid windowtext 1pt;
              padding: 0cm 1.4pt 0cm 1.4pt;
              height: 1cm;
            "
          >
            <p
              style="
                margin-right: 0cm;
                margin-bottom: 0cm;
                margin-left: 0cm;
                font-size: 16px;
                font-family: 'Times New Roman', serif;
                margin: 0cm;
                text-align: center;
                line-height: 18pt;
              "
            >
              <u
                ><span style="font-family: 標楷體; color: black"
                  >&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</span
                ></u
              ><span style="font-family: 標楷體; color: black">元</span>
            </p>
          </td>
        </tr>
        <tr>
          <td style="border: none"><br /></td>
          <td style="border: none"><br /></td>
          <td style="border: none"><br /></td>
          <td style="border: none; width: 4.0757%"><br /></td>
          <td style="border: none; width: 4.949%"><br /></td>
          <td style="border: none"><br /></td>
          <td style="border: none"><br /></td>
          <td style="border: none"><br /></td>
          <td style="border: none"><br /></td>
          <td style="border: none"><br /></td>
          <td style="border: none"><br /></td>
          <td style="border: none"><br /></td>
          <td style="border: none"><br /></td>
          <td style="border: none"><br /></td>
          <td style="border: none"><br /></td>
          <td style="border: none"><br /></td>
          <td style="border: none"><br /></td>
        </tr>
      </tbody>
    </table>

    <!-- <p style='margin-right:0cm;margin-bottom:0cm;margin-left:0cm;font-size:16px;font-family:"Times New Roman",serif;margin:0cm;line-height:15.0pt;'><span style="font-size:15px;font-family:標楷體;color:black;">&nbsp;</span></p> -->
    <!-- 按鈕觸發列印功能 -->
    <button onclick="window.print()">列印頁面</button>
  </div>
</template>

<script setup>
import { format, getYear } from 'date-fns'
import { computed, onBeforeMount } from 'vue'
import { useInformationStore } from '@/stores/informationStore'
import { useDraftApplicationStore } from '@/stores/draftApplicationStore'

const draftApplicationStore = useDraftApplicationStore()
const informationsStore = useInformationStore()
const subsidyRule = {
  transportationFee: 200,
  monthlyLimit: 4000,
}

onBeforeMount(async () => {
  // if (Object.keys(informationsStore.information).length === 0) {
  // }
  // if (draftApplicationStore.draftApplications.length === 0) {
  // }

  informationsStore.fetchInformation()
  draftApplicationStore.fetchDraftApplications()
})
const addressIsSame = computed(() => {
  return (
    informationsStore.information.household_address ===
    informationsStore.information.contact_address
  )
})
const summaryFromParent = computed(() => {
  //因為html結構的關係，先作兩行
  const emptyDataLength = 2 - draftApplicationStore.draftApplications.length
  const data = draftApplicationStore.draftApplications.map((monthlyApp) => {
    return {
      month: monthlyApp.month.slice(-2),
      transportationCount: monthlyApp.transportation_count,
      selfPayProgramsTotal: monthlyApp.self_pay_programs_total,
    }
  })

  const emptyData = new Array(emptyDataLength).fill({
    month: '',
    transportationCount: '',
    selfPayProgramsTotal: '',
  })

  return data.concat(emptyData)
})
const transportationDocIsAttached = computed(() => {
  const attachments = draftApplicationStore.draftApplications.map(
    (monthlyData) => monthlyData.transportation_document_copy_url
  )
  return !attachments.every((ele) => ele === null)
})
const selfPayDocIsAttached = computed(() => {
  const attachments = draftApplicationStore.draftApplications.map(
    (monthlyData) => monthlyData.program_document_copy_url
  )
  return !attachments.every((ele) => ele === null)
})
const subsidyPeriod = computed(() => {
  if (draftApplicationStore.draftApplications.length === 0)
    return {
      startYear: '',
      startMonth: '',
      endYear: '',
      endMonth: '',
    }

  const start = draftApplicationStore.draftApplications[0].month.split('-')
  const end =
    draftApplicationStore.draftApplications[
      draftApplicationStore.draftApplications.length - 1
    ].month.split('-')

  return {
    startYear: start[0],
    startMonth: start[1],
    endYear: end[0],
    endMonth: end[1],
  }
})
const totalAmount = computed(() => {
  const applications = draftApplicationStore.draftApplications
  const monthlySum = applications.map((monthlyData) => {
    return (
      monthlyData.transportation_count * subsidyRule.transportationFee +
      monthlyData.self_pay_programs_total
    )
  })
  return monthlySum
    .map((monthlySum) =>
      monthlySum > subsidyRule.monthlyLimit ? subsidyRule.monthlyLimit : monthlySum
    )
    .reduce((total, monthlySubsidy) => {
      return (total += monthlySubsidy)
    }, 0)
})
</script>

<style scoped>
button {
  display: inline-block;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

@media print {
  @page {
    size: A4; /* 設定為 A4 */
    margin: 0; /* 清除頁邊距 */
  }

  .container {
    margin: 35mm;
    padding: 0;
    zoom: 0.8;
    font-family: 標楷體;
  }

  button {
    display: none; /* 列印時隱藏button */
  }
}
</style>
