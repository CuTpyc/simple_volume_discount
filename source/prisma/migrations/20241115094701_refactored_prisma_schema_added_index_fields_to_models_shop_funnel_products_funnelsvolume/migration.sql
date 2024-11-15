-- CreateIndex
CREATE INDEX "shopId_funellId_unique" ON "FunellsVolume"("shopId", "funellId");

-- CreateIndex
CREATE INDEX "shopifyId_unique" ON "Products"("shopifyId");

-- CreateIndex
CREATE INDEX "shop_unique" ON "Shop"("shop");
