"use client";

import { Plus, RefreshCw } from "lucide-react";
import { useState } from "react";

import { Toolbar } from "@/components/layout/toolbar";
import { Alert } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog } from "@/components/ui/dialog";
import { EmptyState } from "@/components/ui/empty-state";
import { Pagination } from "@/components/ui/pagination";
import { SearchField } from "@/components/ui/search-field";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  TableWrap,
} from "@/components/ui/table";
import { Tabs } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

const tabItems = [
  {
    value: "aktif",
    label: "Aktif",
  },
  {
    value: "riwayat",
    label: "Riwayat",
  },
  {
    value: "arsip",
    label: "Arsip",
  },
] as const;

export function UiLabGlobalComponents() {
  const [tab, setTab] = useState("aktif");

  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <section className="og-ui-lab-production">
      <header className="og-ui-lab-production__header">
        <div>
          <span className="og-ui-lab-index">15</span>

          <div>
            <h2>Global Production Components</h2>

            <p>
              Komponen di bawah ini adalah komponen production yang sama dengan yang
              dipakai feature OPERGRID.
            </p>
          </div>
        </div>

        <Badge severity="normal">Global contract</Badge>
      </header>

      <div className="og-ui-lab-production__stack">
        <Card>
          <CardHeader>
            <div>
              <CardTitle>Card</CardTitle>

              <CardDescription>
                Satu struktur card global untuk seluruh feature.
              </CardDescription>
            </div>

            <Badge severity="info">Production</Badge>
          </CardHeader>

          <CardContent>
            <p className="og-ui-lab-production__copy">
              Feature boleh mengubah isi dan workflow, tetapi border, radius, header,
              content, footer, dan spacing berasal dari global component.
            </p>
          </CardContent>

          <CardFooter>
            <Button variant="secondary">Batal</Button>

            <Button>Simpan</Button>
          </CardFooter>
        </Card>

        <div className="og-ui-lab-production__grid">
          <Alert severity="info" title="Informasi">
            Data referensi berhasil dimuat.
          </Alert>

          <Alert severity="success" title="Berhasil">
            Perubahan sudah tersimpan.
          </Alert>

          <Alert severity="warning" title="Perhatian">
            Terdapat data yang perlu diverifikasi.
          </Alert>

          <Alert severity="critical" title="Gagal">
            Data tidak dapat disimpan.
          </Alert>
        </div>

        <Card>
          <CardHeader>
            <div>
              <CardTitle>Form controls</CardTitle>

              <CardDescription>Control geometry konsisten.</CardDescription>
            </div>
          </CardHeader>

          <CardContent>
            <div className="og-ui-lab-production__form">
              <SearchField placeholder="Cari Functional Location..." />

              <Textarea label="Catatan" placeholder="Tambahkan catatan operasional" />

              <Checkbox
                label="Aktif"
                description="Data tersedia untuk workflow operasional."
                defaultChecked
              />

              <Switch
                label="Notifikasi"
                description="Aktifkan notifikasi perubahan data."
                defaultChecked
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div>
              <CardTitle>Tabs & Toolbar</CardTitle>

              <CardDescription>Navigation dan action bar yang reusable.</CardDescription>
            </div>
          </CardHeader>

          <CardContent>
            <Tabs
              ariaLabel="Contoh status data"
              items={tabItems}
              value={tab}
              onValueChange={setTab}
            />

            <div className="og-ui-lab-production__spacer" />

            <Toolbar
              leading={<SearchField placeholder="Cari data..." />}
              trailing={
                <>
                  <Button variant="secondary">
                    <RefreshCw size={15} aria-hidden="true" />
                    Refresh
                  </Button>

                  <Button>
                    <Plus size={15} aria-hidden="true" />
                    Tambah
                  </Button>
                </>
              }
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div>
              <CardTitle>Data Table</CardTitle>

              <CardDescription>
                Satu struktur table global dengan numeric alignment standar.
              </CardDescription>
            </div>
          </CardHeader>

          <TableWrap>
            <Table>
              <TableHead>
                <TableRow>
                  <TableHeaderCell>Asset</TableHeaderCell>

                  <TableHeaderCell>Lokasi</TableHeaderCell>

                  <TableHeaderCell numeric>Tegangan</TableHeaderCell>

                  <TableHeaderCell>Status</TableHeaderCell>
                </TableRow>
              </TableHead>

              <TableBody>
                <TableRow>
                  <TableCell>SDKAL-L01</TableCell>

                  <TableCell>GI Sidikalang</TableCell>

                  <TableCell numeric>149.82 kV</TableCell>

                  <TableCell>
                    <Badge severity="normal">Normal</Badge>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>TOBA-TRF01</TableCell>

                  <TableCell>GI Toba</TableCell>

                  <TableCell numeric>151.04 kV</TableCell>

                  <TableCell>
                    <Badge severity="warning">Review</Badge>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableWrap>

          <CardFooter>
            <Pagination page={1} totalPages={6} />
          </CardFooter>
        </Card>

        <div className="og-ui-lab-production__grid">
          <Card>
            <EmptyState
              compact
              title="Belum ada data"
              description="Tambahkan data pertama untuk memulai."
              action={
                <Button>
                  <Plus size={15} aria-hidden="true" />
                  Tambah data
                </Button>
              }
            />
          </Card>

          <Card>
            <CardHeader>
              <div>
                <CardTitle>Confirmation Dialog</CardTitle>

                <CardDescription>
                  Dialog global untuk confirmation dan form pendek.
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent>
              <Button
                variant="secondary"
                onClick={() => {
                  setDialogOpen(true);
                }}
              >
                Buka dialog
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <Dialog
        open={dialogOpen}
        title="Konfirmasi perubahan"
        description="Pastikan data sudah benar sebelum melanjutkan."
        onClose={() => {
          setDialogOpen(false);
        }}
        footer={
          <>
            <Button
              variant="secondary"
              onClick={() => {
                setDialogOpen(false);
              }}
            >
              Batal
            </Button>

            <Button
              onClick={() => {
                setDialogOpen(false);
              }}
            >
              Konfirmasi
            </Button>
          </>
        }
      >
        <Alert severity="warning" title="Perubahan data">
          Tindakan ini akan memperbarui data operasional.
        </Alert>
      </Dialog>
    </section>
  );
}
