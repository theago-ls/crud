-- CreateTable
CREATE TABLE "Address" (
    "CPF" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "street2" TEXT,
    "number" INTEGER NOT NULL,
    "zipcode" TEXT NOT NULL,
    "neighborhood" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Nurse" (
    "CPF" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "dob" TIMESTAMP(3) NOT NULL,
    "admissionDate" TIMESTAMP(3) NOT NULL,
    "expertise" TEXT NOT NULL,
    "addressId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Appointment" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "type" TEXT NOT NULL,
    "doctorCPF" TEXT NOT NULL,
    "patientCPF" TEXT NOT NULL,

    CONSTRAINT "Appointment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Doctor" (
    "CRM" TEXT NOT NULL,
    "CPF" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "dob" TIMESTAMP(3) NOT NULL,
    "admissionDate" TIMESTAMP(3) NOT NULL,
    "expertise" TEXT NOT NULL,
    "addressCPF" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Patient" (
    "CPF" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "dob" TIMESTAMP(3) NOT NULL,
    "diagnosis" TEXT,
    "addressId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Shift" (
    "CPF" TEXT NOT NULL,
    "checkIn" TEXT NOT NULL,
    "checkOut" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Address_CPF_key" ON "Address"("CPF");

-- CreateIndex
CREATE UNIQUE INDEX "Nurse_CPF_key" ON "Nurse"("CPF");

-- CreateIndex
CREATE UNIQUE INDEX "Appointment_doctorCPF_key" ON "Appointment"("doctorCPF");

-- CreateIndex
CREATE UNIQUE INDEX "Appointment_patientCPF_key" ON "Appointment"("patientCPF");

-- CreateIndex
CREATE UNIQUE INDEX "Doctor_CPF_key" ON "Doctor"("CPF");

-- CreateIndex
CREATE UNIQUE INDEX "Patient_CPF_key" ON "Patient"("CPF");

-- CreateIndex
CREATE UNIQUE INDEX "Shift_CPF_key" ON "Shift"("CPF");

-- AddForeignKey
ALTER TABLE "Nurse" ADD CONSTRAINT "Nurse_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("CPF") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_doctorCPF_fkey" FOREIGN KEY ("doctorCPF") REFERENCES "Doctor"("CPF") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_patientCPF_fkey" FOREIGN KEY ("patientCPF") REFERENCES "Patient"("CPF") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Doctor" ADD CONSTRAINT "Doctor_addressCPF_fkey" FOREIGN KEY ("addressCPF") REFERENCES "Address"("CPF") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Patient" ADD CONSTRAINT "Patient_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("CPF") ON DELETE RESTRICT ON UPDATE CASCADE;
