
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Search, ShoppingCart, Heart, UserRound, Sun, Moon,
  ArrowLeft, ShieldCheck, Truck, Star, Plus, Minus,
  Menu, X, Leaf, Sparkles, Trash2
} from "lucide-react";
import "./App.css";

const categories = [
  { name: "الكل", emoji: "🛒" },
  { name: "خضار وفاكهة", emoji: "🥑" },
  { name: "ألبان وجبن", emoji: "🥛" },
  { name: "لحوم ودواجن", emoji: "🍗" },
  { name: "مخبوزات", emoji: "🥐" },
  { name: "مشروبات", emoji: "🧃" },
  { name: "سناكس ومعلبات", emoji: "🍿" },
  { name: "منظفات", emoji: "🧴" },
  { name: "عناية شخصية", emoji: "🧼" },
  { name: "أرز ومكرونة", emoji: "🍝" },
  { name: "قهوة وشاي", emoji: "☕" },
  { name: "مستلزمات منزلية", emoji: "🏠" },
  { name: "فطار ومربى", emoji: "🍯" },
  { name: "معلبات وصلصات", emoji: "🥫" },
  { name: "توابل ومستلزمات خبز", emoji: "🧂" },
  { name: "حبوب وشوفان", emoji: "🥣" },
  { name: "مجمدات", emoji: "🧊" },
  { name: "بقوليات", emoji: "🫘" },
  { name: "أجبان ومقبلات", emoji: "🧀" },
  { name: "مستلزمات المطبخ", emoji: "🍳" },
  { name: "أغذية الأطفال", emoji: "🍼" },
];

const products = [
  { id: 1, name: "تفاح أحمر طازج", category: "خضار وفاكهة", detail: "كيلو واحد", price: 55, oldPrice: 65, rating: 4.8, image: "photo-1560806887-1e4cd0b6cbd6", color: "#fff0ed" },
  { id: 2, name: "لبن كامل الدسم", category: "ألبان وجبن", detail: "عبوة 1 لتر", price: 32, oldPrice: 38, rating: 4.7, image: "photo-1563636619-e9143da7973b", color: "#edf5ff" },
  { id: 3, name: "بيض طازج", category: "ألبان وجبن", detail: "طبق 30 بيضة", price: 120, oldPrice: null, rating: 4.9, image: "photo-1506976785307-8732e854ad03", color: "#fff7e8" },
  { id: 4, name: "عصير برتقال طبيعي", category: "مشروبات", detail: "عبوة 1 لتر", price: 45, oldPrice: 52, rating: 4.6, image: "photo-1600271886742-f049cd451bba", color: "#fff2df" },
  { id: 5, name: "خبز طازج", category: "مخبوزات", detail: "عبوة مخبوزات", price: 25, oldPrice: null, rating: 4.5, image: "photo-1509440159596-0249088772ff", color: "#fff0dc" },
  { id: 6, name: "دجاج طازج", category: "لحوم ودواجن", detail: "كيلو واحد", price: 110, oldPrice: 125, rating: 4.7, image: "photo-1604503468506-a8da13d82791", color: "#fff0ef" },
  { id: 7, name: "خضار طازج", category: "خضار وفاكهة", detail: "تشكيلة يومية", price: 40, oldPrice: null, rating: 4.8, image: "photo-1540420773420-3366772f4999", color: "#edf7e9" },
  { id: 8, name: "سناكس متنوعة", category: "سناكس ومعلبات", detail: "عبوة عائلية", price: 35, oldPrice: 42, rating: 4.4, image: "photo-1621939514649-280e2aa2c2a1", color: "#fff0e6" },
  { id: 9, name: "منظف متعدد الاستخدام", category: "منظفات", detail: "عبوة 1 لتر", price: 65, oldPrice: null, rating: 4.5, image: "photo-1563453392212-326f5e854473", color: "#eaf3ff" },
  { id: 10, name: "موز طازج", category: "خضار وفاكهة", detail: "كيلو واحد", price: 35, oldPrice: 40, rating: 4.8, image: "photo-1571771894821-ce9b6c11b08e", color: "#fff8db" },
  { id: 11, name: "جبنة بيضاء", category: "ألبان وجبن", detail: "عبوة 500 جرام", price: 48, oldPrice: null, rating: 4.6, image: "photo-1486297678162-eb2a19b0a32d", color: "#f7f2e8" },
  { id: 12, name: "فراولة طازجة", category: "خضار وفاكهة", detail: "عبوة 500 جرام", price: 60, oldPrice: 75, rating: 4.9, image: "photo-1464965911861-746a04b4bca6", color: "#fff0f2" },
  { id: 13, name: "طماطم بلدي", category: "خضار وفاكهة", detail: "كيلو واحد", price: 22, oldPrice: 28, rating: 4.7, image: "photo-1546094096-0df4bcaaa337", color: "#fff0ed" },
  { id: 14, name: "خيار طازج", category: "خضار وفاكهة", detail: "كيلو واحد", price: 18, oldPrice: null, rating: 4.6, image: "photo-1604977042946-1eecc30f269e", color: "#edf7e9" },
  { id: 15, name: "برتقال عصير", category: "خضار وفاكهة", detail: "كيلو واحد", price: 30, oldPrice: 36, rating: 4.8, image: "photo-1547514701-42782101795e", color: "#fff2df" },
  { id: 16, name: "بطاطس", category: "خضار وفاكهة", detail: "كيلو واحد", price: 20, oldPrice: null, rating: 4.5, image: "photo-1518977676601-b53f82aba655", color: "#f7f0e6" },
  { id: 17, name: "مانجو", category: "خضار وفاكهة", detail: "كيلو واحد", price: 75, oldPrice: 90, rating: 4.9, image: "photo-1553279768-865429fa0078", color: "#fff4d9" },
  { id: 18, name: "زبادي طبيعي", category: "ألبان وجبن", detail: "عبوة 105 جرام", price: 10, oldPrice: null, rating: 4.6, image: "photo-1488477181946-6428a0291777", color: "#f3f6ff" },
  { id: 19, name: "جبنة شيدر", category: "ألبان وجبن", detail: "عبوة 250 جرام", price: 58, oldPrice: 68, rating: 4.7, image: "photo-1552767059-ce182ead6c1b", color: "#fff3d9" },
  { id: 20, name: "زبدة", category: "ألبان وجبن", detail: "عبوة 200 جرام", price: 52, oldPrice: null, rating: 4.5, image: "photo-1589985270826-4b7bb135bc9d", color: "#fff8db" },
  { id: 21, name: "لحم بقري", category: "لحوم ودواجن", detail: "كيلو واحد", price: 360, oldPrice: 390, rating: 4.7, image: "photo-1607623814075-e51df1bdc82f", color: "#fff0ef" },
  { id: 22, name: "صدور دجاج", category: "لحوم ودواجن", detail: "عبوة 1 كيلو", price: 145, oldPrice: null, rating: 4.8, image: "photo-1604503468506-a8da13d82791", color: "#fff0ef" },
  { id: 23, name: "كرواسون", category: "مخبوزات", detail: "قطعتان", price: 28, oldPrice: 34, rating: 4.6, image: "photo-1555507036-ab1f4038808a", color: "#fff0dc" },
  { id: 24, name: "توست أبيض", category: "مخبوزات", detail: "عبوة 500 جرام", price: 30, oldPrice: null, rating: 4.5, image: "photo-1598373182133-52452f7691ef", color: "#fff0dc" },
  { id: 25, name: "مياه معدنية", category: "مشروبات", detail: "عبوة 1.5 لتر", price: 12, oldPrice: null, rating: 4.7, image: "photo-1602143407151-7111542de6e8", color: "#edf5ff" },
  { id: 26, name: "مشروب غازي", category: "مشروبات", detail: "عبوة 1 لتر", price: 25, oldPrice: 30, rating: 4.4, image: "photo-1629203851122-3726ecdf080e", color: "#fff0ed" },
  { id: 27, name: "شيبسي بطعم الجبنة", category: "سناكس ومعلبات", detail: "كيس عائلي", price: 20, oldPrice: 24, rating: 4.4, image: "photo-1566478989037-eec170784d0b", color: "#fff0e6" },
  { id: 28, name: "بسكويت بالشوكولاتة", category: "سناكس ومعلبات", detail: "عبوة 200 جرام", price: 32, oldPrice: null, rating: 4.6, image: "photo-1499636136210-6f4ee915583e", color: "#f7eee8" },
  { id: 29, name: "تونة معلبة", category: "سناكس ومعلبات", detail: "علبة 140 جرام", price: 42, oldPrice: 48, rating: 4.5, image: "photo-1534483509719-3f5af1e9d7e3", color: "#edf5ff" },
  { id: 30, name: "مسحوق غسيل", category: "منظفات", detail: "عبوة 1 كيلو", price: 85, oldPrice: 99, rating: 4.6, image: "photo-1605276374104-dee2a0ed3cd6", color: "#eaf3ff" },
  { id: 31, name: "سائل غسيل الأطباق", category: "منظفات", detail: "عبوة 600 مل", price: 38, oldPrice: null, rating: 4.5, image: "photo-1585421514738-01798e348b17", color: "#eaf3ff" },
  { id: 32, name: "شامبو للشعر", category: "عناية شخصية", detail: "عبوة 400 مل", price: 95, oldPrice: 115, rating: 4.6, image: "photo-1608248543803-ba4f8c70ae0b", color: "#f5efff" },
  { id: 33, name: "صابون لليدين", category: "عناية شخصية", detail: "عبوة 250 مل", price: 35, oldPrice: null, rating: 4.5, image: "photo-1600857544200-b2f666a9a2ec", color: "#f5efff" },
  { id: 34, name: "أرز مصري", category: "أرز ومكرونة", detail: "كيس 1 كيلو", price: 32, oldPrice: 37, rating: 4.7, image: "photo-1586201375761-83865001e31c", color: "#fff8e8" },
  { id: 35, name: "مكرونة", category: "أرز ومكرونة", detail: "كيس 400 جرام", price: 18, oldPrice: null, rating: 4.6, image: "photo-1551462147-ff29053bfc14", color: "#fff4df" },
  { id: 36, name: "زيت عباد الشمس", category: "أرز ومكرونة", detail: "زجاجة 1 لتر", price: 78, oldPrice: 88, rating: 4.6, image: "photo-1474979266404-7eaacbcd87c5", color: "#fff8db" },
  { id: 37, name: "شاي أسود", category: "قهوة وشاي", detail: "عبوة 250 جرام", price: 68, oldPrice: null, rating: 4.7, image: "photo-1544787219-7f47ccb76574", color: "#f5eee7" },
  { id: 38, name: "قهوة مطحونة", category: "قهوة وشاي", detail: "عبوة 200 جرام", price: 115, oldPrice: 130, rating: 4.8, image: "photo-1559526324-593bc073d938", color: "#f3e9df" },
  { id: 39, name: "مناديل ورقية", category: "مستلزمات منزلية", detail: "عبوة 3 علب", price: 45, oldPrice: null, rating: 4.5, image: "photo-1583947215259-38e31be8751f", color: "#f5f5f5" },
  { id: 40, name: "أكياس قمامة", category: "مستلزمات منزلية", detail: "لفة 30 كيس", price: 28, oldPrice: 35, rating: 4.4, image: "photo-1605600659873-d808a13e4d9a", color: "#eef1f3" },
  { id: 41, name: "مربى فراولة", category: "فطار ومربى", detail: "برطمان 350 جرام", price: 48, oldPrice: 55, rating: 4.6, image: "photo-1563805042-7684c019e1cb", color: "#fff0f2" },
  { id: 42, name: "شوفان", category: "حبوب وشوفان", detail: "عبوة 500 جرام", price: 65, oldPrice: null, rating: 4.7, image: "photo-1517673132405-a56a62b18caf", color: "#f7f0e6" },
  { id: 43, name: "عسل أبيض", category: "فطار ومربى", detail: "برطمان 250 جرام", price: 85, oldPrice: 95, rating: 4.8, image: "photo-1587049352846-4a222e784d38", color: "#fff4d9" },
  { id: 44, name: "صلصة طماطم", category: "معلبات وصلصات", detail: "عبوة 300 جرام", price: 22, oldPrice: null, rating: 4.5, image: "photo-1472476443507-c7a5948772fc", color: "#fff0ed" },
  { id: 45, name: "فول معلب", category: "معلبات وصلصات", detail: "علبة 400 جرام", price: 28, oldPrice: 32, rating: 4.4, image: "photo-1547592180-85f173990554", color: "#f7f0e6" },
  { id: 46, name: "ذرة حلوة", category: "معلبات وصلصات", detail: "علبة 200 جرام", price: 30, oldPrice: null, rating: 4.5, image: "photo-1551754655-cd27e38d2076", color: "#fff8db" },
  { id: 47, name: "كاتشب", category: "معلبات وصلصات", detail: "عبوة 340 جرام", price: 35, oldPrice: 40, rating: 4.5, image: "photo-1472476443507-c7a5948772fc", color: "#fff0ed" },
  { id: 48, name: "فلفل أسود", category: "توابل ومستلزمات خبز", detail: "عبوة 100 جرام", price: 25, oldPrice: null, rating: 4.6, image: "photo-1596040033229-a9821ebd058d", color: "#f3eee8" },
  { id: 49, name: "دقيق أبيض", category: "توابل ومستلزمات خبز", detail: "كيس 1 كيلو", price: 30, oldPrice: null, rating: 4.5, image: "photo-1627485937980-221c88ac04f9", color: "#f7f2e8" },
  { id: 50, name: "سكر أبيض", category: "توابل ومستلزمات خبز", detail: "كيس 1 كيلو", price: 35, oldPrice: 39, rating: 4.6, image: "photo-1581441363689-1f3c3c414635", color: "#fff8e8" },
  { id: 51, name: "رقائق إفطار", category: "حبوب وشوفان", detail: "عبوة 300 جرام", price: 72, oldPrice: 80, rating: 4.6, image: "photo-1517093157656-b9eccef91cb1", color: "#fff4df" },
  { id: 52, name: "عدس أصفر", category: "حبوب وشوفان", detail: "كيس 500 جرام", price: 38, oldPrice: null, rating: 4.7, image: "photo-1515543904379-3d757afe72e4", color: "#fff8db" },
  
{ id: 53, name: "بصل أحمر", category: "خضار وفاكهة", detail: "كيلو واحد", price: 25, oldPrice: 30, rating: 4.6, image: "photo-1508747703725-719777637510", color: "#f8eeee" },
{ id: 54, name: "جزر طازج", category: "خضار وفاكهة", detail: "كيلو واحد", price: 28, oldPrice: null, rating: 4.7, image: "photo-1445282768818-728615cc910a", color: "#fff1e4" },
{ id: 55, name: "ليمون", category: "خضار وفاكهة", detail: "كيلو واحد", price: 35, oldPrice: 40, rating: 4.6, image: "photo-1513558161293-cdaf765edfd7", color: "#f7f8df" },
{ id: 56, name: "عنب أحمر", category: "خضار وفاكهة", detail: "عبوة 500 جرام", price: 55, oldPrice: null, rating: 4.8, image: "photo-1537640538966-79f369143f8f", color: "#f7eef8" },
{ id: 57, name: "خس طازج", category: "خضار وفاكهة", detail: "رأس واحدة", price: 20, oldPrice: null, rating: 4.5, image: "photo-1556801712-76c8eb07bbc9", color: "#edf7e9" },
{ id: 58, name: "بطيخ", category: "خضار وفاكهة", detail: "كيلو واحد", price: 18, oldPrice: 22, rating: 4.7, image: "photo- watermelon", color: "#fff0ed" },
{ id: 59, name: "كمثرى", category: "خضار وفاكهة", detail: "كيلو واحد", price: 65, oldPrice: null, rating: 4.6, image: "photo-1514756331096-242fdeb70d4a", color: "#f4f4df" },
{ id: 60, name: "كوسة", category: "خضار وفاكهة", detail: "كيلو واحد", price: 25, oldPrice: null, rating: 4.5, image: "photo-1568584711075-3d021a7c3ca3", color: "#edf7e9" },
{ id: 61, name: "فلفل ألوان", category: "خضار وفاكهة", detail: "عبوة 500 جرام", price: 45, oldPrice: 52, rating: 4.7, image: "photo-1563565375-f3fdfdbefa83", color: "#fff0ed" },
{ id: 62, name: "باذنجان", category: "خضار وفاكهة", detail: "كيلو واحد", price: 22, oldPrice: null, rating: 4.4, image: "photo-1659261200824-0f22f8e5b7c7", color: "#f4edf8" },
{ id: 63, name: "لبن خالي الدسم", category: "ألبان وجبن", detail: "عبوة 1 لتر", price: 35, oldPrice: null, rating: 4.6, image: "photo-1563636619-e9143da7973b", color: "#edf5ff" },
{ id: 64, name: "جبنة موتزاريلا", category: "ألبان وجبن", detail: "عبوة 200 جرام", price: 65, oldPrice: 72, rating: 4.8, image: "photo-1486297678162-eb2a19b0a32d", color: "#fff8e8" },
{ id: 65, name: "جبنة كريمي", category: "أجبان ومقبلات", detail: "عبوة 200 جرام", price: 55, oldPrice: null, rating: 4.6, image: "photo-1486297678162-eb2a19b0a32d", color: "#fff8e8" },
{ id: 66, name: "قشطة", category: "ألبان وجبن", detail: "عبوة 170 جرام", price: 28, oldPrice: null, rating: 4.5, image: "photo-1488477181946-6428a0291777", color: "#fff8e8" },
{ id: 67, name: "لبنة", category: "أجبان ومقبلات", detail: "عبوة 250 جرام", price: 48, oldPrice: null, rating: 4.5, image: "photo-1488477181946-6428a0291777", color: "#fff8e8" },
{ id: 68, name: "برجر لحم مجمد", category: "مجمدات", detail: "عبوة 8 قطع", price: 155, oldPrice: 175, rating: 4.6, image: "photo-1568901346375-23c9450c58cd", color: "#fff0ef" },
{ id: 69, name: "بطاطس مجمدة", category: "مجمدات", detail: "كيس 1 كيلو", price: 75, oldPrice: null, rating: 4.7, image: "photo-1630384060421-cb20d0e0649d", color: "#fff4df" },
{ id: 70, name: "خضار مشكل مجمد", category: "مجمدات", detail: "كيس 400 جرام", price: 38, oldPrice: null, rating: 4.5, image: "photo-1540420773420-3366772f4999", color: "#edf7e9" },
{ id: 71, name: "سمك فيليه مجمد", category: "مجمدات", detail: "عبوة 500 جرام", price: 135, oldPrice: 150, rating: 4.6, image: "photo-1510130387422-82bed34b37e9", color: "#edf5ff" },
{ id: 72, name: "جمبري مجمد", category: "مجمدات", detail: "عبوة 400 جرام", price: 190, oldPrice: null, rating: 4.7, image: "photo-1565680018434-b513d5e5fd47", color: "#fff0ef" },
{ id: 73, name: "فاصوليا بيضاء", category: "بقوليات", detail: "كيس 500 جرام", price: 42, oldPrice: null, rating: 4.6, image: "photo-1515543904379-3d757afe72e4", color: "#f7f0e6" },
{ id: 74, name: "حمص", category: "بقوليات", detail: "كيس 500 جرام", price: 48, oldPrice: null, rating: 4.7, image: "photo-1515543904379-3d757afe72e4", color: "#f7f0e6" },
{ id: 75, name: "فول جاف", category: "بقوليات", detail: "كيس 1 كيلو", price: 45, oldPrice: 50, rating: 4.5, image: "photo-1515543904379-3d757afe72e4", color: "#f7f0e6" },
{ id: 76, name: "لوبيا", category: "بقوليات", detail: "كيس 500 جرام", price: 46, oldPrice: null, rating: 4.6, image: "photo-1515543904379-3d757afe72e4", color: "#f7f0e6" },
{ id: 77, name: "فشار", category: "سناكس ومعلبات", detail: "كيس 500 جرام", price: 35, oldPrice: null, rating: 4.5, image: "photo-1578849278619-e73505e9610f", color: "#fff8db" },
{ id: 78, name: "شوكولاتة بالحليب", category: "سناكس ومعلبات", detail: "لوح 100 جرام", price: 40, oldPrice: 45, rating: 4.8, image: "photo-1548907040-4d42f7a5c4e5", color: "#f7eee8" },
{ id: 79, name: "ويفر بالشوكولاتة", category: "سناكس ومعلبات", detail: "عبوة متعددة", price: 28, oldPrice: null, rating: 4.5, image: "photo-1499636136210-6f4ee915583e", color: "#f7eee8" },
{ id: 80, name: "عصير مانجو", category: "مشروبات", detail: "عبوة 1 لتر", price: 42, oldPrice: 48, rating: 4.6, image: "photo-1600271886742-f049cd451bba", color: "#fff4df" },
{ id: 81, name: "عصير تفاح", category: "مشروبات", detail: "عبوة 1 لتر", price: 40, oldPrice: null, rating: 4.5, image: "photo-1600271886742-f049cd451bba", color: "#fff4df" },
{ id: 82, name: "قهوة سريعة التحضير", category: "قهوة وشاي", detail: "برطمان 100 جرام", price: 125, oldPrice: 140, rating: 4.7, image: "photo-1559526324-593bc073d938", color: "#f3e9df" },
{ id: 83, name: "شاي أخضر", category: "قهوة وشاي", detail: "عبوة 25 كيس", price: 55, oldPrice: null, rating: 4.6, image: "photo-1544787219-7f47ccb76574", color: "#edf7e9" },
{ id: 84, name: "يانسون", category: "قهوة وشاي", detail: "عبوة 100 جرام", price: 30, oldPrice: null, rating: 4.5, image: "photo-1544787219-7f47ccb76574", color: "#f7f0e6" },
{ id: 85, name: "قرفة مطحونة", category: "توابل ومستلزمات خبز", detail: "عبوة 100 جرام", price: 32, oldPrice: null, rating: 4.6, image: "photo-1596040033229-a9821ebd058d", color: "#f3eee8" },
{ id: 86, name: "كمون مطحون", category: "توابل ومستلزمات خبز", detail: "عبوة 100 جرام", price: 28, oldPrice: null, rating: 4.5, image: "photo-1596040033229-a9821ebd058d", color: "#f3eee8" },
{ id: 87, name: "كزبرة ناشفة", category: "توابل ومستلزمات خبز", detail: "عبوة 100 جرام", price: 24, oldPrice: null, rating: 4.4, image: "photo-1596040033229-a9821ebd058d", color: "#f3eee8" },
{ id: 88, name: "بيكنج باودر", category: "توابل ومستلزمات خبز", detail: "عبوة 100 جرام", price: 18, oldPrice: null, rating: 4.5, image: "photo-1627485937980-221c88ac04f9", color: "#f7f2e8" },
{ id: 89, name: "خميرة فورية", category: "توابل ومستلزمات خبز", detail: "عبوة 11 جرام", price: 8, oldPrice: null, rating: 4.4, image: "photo-1627485937980-221c88ac04f9", color: "#f7f2e8" },
{ id: 90, name: "عدس بني", category: "بقوليات", detail: "كيس 500 جرام", price: 40, oldPrice: null, rating: 4.6, image: "photo-1515543904379-3d757afe72e4", color: "#f7f0e6" },
{ id: 91, name: "برغل", category: "حبوب وشوفان", detail: "كيس 500 جرام", price: 35, oldPrice: null, rating: 4.5, image: "photo-1517673132405-a56a62b18caf", color: "#f7f0e6" },
{ id: 92, name: "كينوا", category: "حبوب وشوفان", detail: "كيس 250 جرام", price: 95, oldPrice: 110, rating: 4.6, image: "photo-1517673132405-a56a62b18caf", color: "#f7f0e6" },
{ id: 93, name: "مكرونة اسباجيتي", category: "أرز ومكرونة", detail: "كيس 400 جرام", price: 20, oldPrice: null, rating: 4.6, image: "photo-1551462147-ff29053bfc14", color: "#fff4df" },
{ id: 94, name: "مكرونة أقلام", category: "أرز ومكرونة", detail: "كيس 400 جرام", price: 20, oldPrice: null, rating: 4.6, image: "photo-1551462147-ff29053bfc14", color: "#fff4df" },
{ id: 95, name: "دقيق ذرة", category: "توابل ومستلزمات خبز", detail: "كيس 500 جرام", price: 28, oldPrice: null, rating: 4.5, image: "photo-1627485937980-221c88ac04f9", color: "#fff8db" },
{ id: 96, name: "زيت زيتون", category: "أرز ومكرونة", detail: "زجاجة 500 مل", price: 165, oldPrice: 185, rating: 4.8, image: "photo-1474979266404-7eaacbcd87c5", color: "#fff8db" },
{ id: 97, name: "خل أبيض", category: "مستلزمات المطبخ", detail: "عبوة 1 لتر", price: 22, oldPrice: null, rating: 4.5, image: "photo-1474979266404-7eaacbcd87c5", color: "#f7f7ed" },
{ id: 98, name: "أكياس حفظ الطعام", category: "مستلزمات المطبخ", detail: "عبوة 50 كيس", price: 35, oldPrice: null, rating: 4.5, image: "photo-1605600659873-d808a13e4d9a", color: "#eef1f3" },
{ id: 99, name: "ورق ألومنيوم", category: "مستلزمات المطبخ", detail: "لفة واحدة", price: 45, oldPrice: null, rating: 4.5, image: "photo-1605600659873-d808a13e4d9a", color: "#eef1f3" },
{ id: 100, name: "إسفنجة أطباق", category: "مستلزمات المطبخ", detail: "عبوة 3 قطع", price: 18, oldPrice: null, rating: 4.4, image: "photo-1585421514738-01798e348b17", color: "#eaf3ff" },
{ id: 101, name: "مناديل مطبخ", category: "مستلزمات منزلية", detail: "عبوة 2 رول", price: 32, oldPrice: null, rating: 4.5, image: "photo-1583947215259-38e31be8751f", color: "#f5f5f5" },
{ id: 102, name: "معطر جو", category: "منظفات", detail: "عبوة 300 مل", price: 48, oldPrice: 55, rating: 4.5, image: "photo-1563453392212-326f5e854473", color: "#eaf3ff" },
{ id: 103, name: "مطهر أسطح", category: "منظفات", detail: "عبوة 500 مل", price: 42, oldPrice: null, rating: 4.6, image: "photo-1563453392212-326f5e854473", color: "#eaf3ff" },
{ id: 104, name: "بلسم شعر", category: "عناية شخصية", detail: "عبوة 400 مل", price: 90, oldPrice: 105, rating: 4.6, image: "photo-1608248543803-ba4f8c70ae0b", color: "#f5efff" },
{ id: 105, name: "غسول وجه", category: "عناية شخصية", detail: "عبوة 150 مل", price: 110, oldPrice: null, rating: 4.6, image: "photo-1608248543803-ba4f8c70ae0b", color: "#f5efff" },
{ id: 106, name: "معجون أسنان", category: "عناية شخصية", detail: "عبوة 100 مل", price: 48, oldPrice: null, rating: 4.5, image: "photo-1600857544200-b2f666a9a2ec", color: "#f5efff" },
{ id: 107, name: "حفاضات أطفال", category: "أغذية الأطفال", detail: "عبوة تجريبية", price: 180, oldPrice: 205, rating: 4.7, image: "photo-1604917877934-07d8d248d396", color: "#edf5ff" },
{ id: 108, name: "سيريلاك أطفال", category: "أغذية الأطفال", detail: "عبوة 250 جرام", price: 95, oldPrice: null, rating: 4.6, image: "photo-1517673132405-a56a62b18caf", color: "#fff4df" },
{ id: 109, name: "بسكويت أطفال", category: "أغذية الأطفال", detail: "عبوة 120 جرام", price: 32, oldPrice: null, rating: 4.5, image: "photo-1499636136210-6f4ee915583e", color: "#fff4df" },
{ id: 110, name: "مربى مشمش", category: "فطار ومربى", detail: "برطمان 350 جرام", price: 52, oldPrice: 60, rating: 4.6, image: "photo-1563805042-7684c019e1cb", color: "#fff4d9" },
{ id: 111, name: "زبدة فول سوداني", category: "فطار ومربى", detail: "برطمان 340 جرام", price: 115, oldPrice: null, rating: 4.7, image: "photo-1528750997573-59b89d56f4f7", color: "#f7f0e6" },
{ id: 112, name: "مربى تين", category: "فطار ومربى", detail: "برطمان 350 جرام", price: 58, oldPrice: null, rating: 4.5, image: "photo-1563805042-7684c019e1cb", color: "#fff0f2" },

{ id: 113, name: "ثوم", category: "خضار وفاكهة", detail: "عبوة 250 جرام", price: 25, oldPrice: null, rating: 4.6, image: "", color: "#fff8e8" },
{ id: 114, name: "بقدونس طازج", category: "خضار وفاكهة", detail: "حزمة واحدة", price: 8, oldPrice: null, rating: 4.4, image: "", color: "#edf7e9" },
{ id: 115, name: "قرنبيط", category: "خضار وفاكهة", detail: "الواحدة", price: 35, oldPrice: 40, rating: 4.5, image: "", color: "#f5f5ed" },
{ id: 116, name: "خوخ", category: "خضار وفاكهة", detail: "كيلو واحد", price: 70, oldPrice: null, rating: 4.7, image: "", color: "#fff0ed" },
{ id: 117, name: "كيوي", category: "خضار وفاكهة", detail: "عبوة 500 جرام", price: 85, oldPrice: 95, rating: 4.7, image: "", color: "#edf7e9" },
{ id: 118, name: "رمان", category: "خضار وفاكهة", detail: "كيلو واحد", price: 65, oldPrice: null, rating: 4.7, image: "", color: "#fff0f2" },
{ id: 119, name: "أناناس", category: "خضار وفاكهة", detail: "ثمرة واحدة", price: 95, oldPrice: null, rating: 4.6, image: "", color: "#fff8db" },
{ id: 120, name: "بروكلي", category: "خضار وفاكهة", detail: "رأس واحدة", price: 45, oldPrice: null, rating: 4.6, image: "", color: "#edf7e9" },
{ id: 121, name: "لبن رايب", category: "ألبان وجبن", detail: "عبوة 500 مل", price: 25, oldPrice: null, rating: 4.5, image: "", color: "#edf5ff" },
{ id: 122, name: "كريمة طبخ", category: "ألبان وجبن", detail: "عبوة 200 مل", price: 42, oldPrice: 48, rating: 4.6, image: "", color: "#fff8e8" },
{ id: 123, name: "جبنة رومي", category: "أجبان ومقبلات", detail: "عبوة 250 جرام", price: 75, oldPrice: null, rating: 4.7, image: "", color: "#fff4df" },
{ id: 124, name: "جبنة فيتا", category: "أجبان ومقبلات", detail: "عبوة 500 جرام", price: 60, oldPrice: 68, rating: 4.6, image: "", color: "#fff8e8" },
{ id: 125, name: "سجق مجمد", category: "مجمدات", detail: "عبوة 400 جرام", price: 115, oldPrice: 130, rating: 4.5, image: "", color: "#fff0ef" },
{ id: 126, name: "ناجتس دجاج", category: "مجمدات", detail: "عبوة 400 جرام", price: 105, oldPrice: null, rating: 4.6, image: "", color: "#fff4df" },
{ id: 127, name: "بسلة مجمدة", category: "مجمدات", detail: "كيس 400 جرام", price: 38, oldPrice: null, rating: 4.5, image: "", color: "#edf7e9" },
{ id: 128, name: "فراولة مجمدة", category: "مجمدات", detail: "كيس 400 جرام", price: 65, oldPrice: 75, rating: 4.7, image: "", color: "#fff0f2" },
{ id: 129, name: "فاصوليا حمراء", category: "بقوليات", detail: "كيس 500 جرام", price: 48, oldPrice: null, rating: 4.6, image: "", color: "#f7f0e6" },
{ id: 130, name: "ترمس", category: "بقوليات", detail: "كيس 500 جرام", price: 35, oldPrice: null, rating: 4.5, image: "", color: "#fff8db" },
{ id: 131, name: "برغل ناعم", category: "حبوب وشوفان", detail: "كيس 500 جرام", price: 35, oldPrice: null, rating: 4.5, image: "", color: "#f7f0e6" },
{ id: 132, name: "ذرة فشار", category: "حبوب وشوفان", detail: "كيس 500 جرام", price: 38, oldPrice: null, rating: 4.5, image: "", color: "#fff8db" },
{ id: 133, name: "شوربة عدس جاهزة", category: "معلبات وصلصات", detail: "عبوة 400 جرام", price: 38, oldPrice: null, rating: 4.5, image: "", color: "#fff4df" },
{ id: 134, name: "مايونيز", category: "معلبات وصلصات", detail: "عبوة 250 جرام", price: 45, oldPrice: 52, rating: 4.6, image: "", color: "#fff8e8" },
{ id: 135, name: "مستردة", category: "معلبات وصلصات", detail: "عبوة 250 جرام", price: 38, oldPrice: null, rating: 4.5, image: "", color: "#fff8db" },
{ id: 136, name: "مخلل خيار", category: "معلبات وصلصات", detail: "برطمان 500 جرام", price: 35, oldPrice: null, rating: 4.5, image: "", color: "#edf7e9" },
{ id: 137, name: "كاكاو خام", category: "توابل ومستلزمات خبز", detail: "عبوة 100 جرام", price: 55, oldPrice: null, rating: 4.7, image: "", color: "#f3e9df" },
{ id: 138, name: "جوز هند مبشور", category: "توابل ومستلزمات خبز", detail: "عبوة 100 جرام", price: 35, oldPrice: null, rating: 4.5, image: "", color: "#f5f5ed" },
{ id: 139, name: "تمر", category: "فطار ومربى", detail: "عبوة 500 جرام", price: 65, oldPrice: 75, rating: 4.7, image: "", color: "#f7eee8" },
{ id: 140, name: "طحينة", category: "فطار ومربى", detail: "برطمان 300 جرام", price: 58, oldPrice: null, rating: 4.6, image: "", color: "#fff8e8" },
{ id: 141, name: "مناديل مبللة", category: "عناية شخصية", detail: "عبوة 60 منديل", price: 40, oldPrice: null, rating: 4.5, image: "", color: "#f5efff" },
{ id: 142, name: "أكياس ساندويتش", category: "مستلزمات المطبخ", detail: "عبوة 50 كيس", price: 28, oldPrice: null, rating: 4.4, image: "", color: "#eef1f3" },

];



const productImageUrl = (product, width = 600) => {
  const image = product?.imageUrl || product?.image || product?.thumbnail;

  if (typeof image === "string" && /^https?:\/\//i.test(image.trim())) {
    return image.trim();
  }

  if (
    typeof image === "string" &&
    /^photo-[\w-]+$/.test(image.trim()) &&
    product.id !== 58
  ) {
    return `https://images.unsplash.com/${image.trim()}?auto=format&fit=crop&w=${width}&q=85`;
  }

  const name = product?.name || "";

  const imageRules = [
    [/بطيخ/, "photo-1542838132-92c53300491e"],
    [/ثوم/, "photo-1508747703725-719777637510"],
    [/بقدونس|خس|بروكلي/, "photo-1556801712-76c8eb07bbc9"],
    [/قرنبيط/, "photo-1540420773420-3366772f4999"],
    [/خوخ|كمثرى|كيوي|رمان|أناناس/, "photo-1553279768-865429fa0078"],
    [/لبن رايب|لبن خالي الدسم|كريمة طبخ|قشطة/, "photo-1563636619-e9143da7973b"],
    [/جبنة رومي|جبنة فيتا|جبنة موتزاريلا|جبنة كريمي/, "photo-1486297678162-eb2a19b0a32d"],
    [/سجق مجمد|ناجتس دجاج/, "photo-1604503468506-a8da13d82791"],
    [/بسلة مجمدة|خضار مشكل مجمد/, "photo-1540420773420-3366772f4999"],
    [/فاصوليا حمراء|ترمس|لوبيا|حمص|فول جاف|عدس/, "photo-1515543904379-3d757afe72e4"],
    [/برغل|كينوا|ذرة فشار/, "photo-1517673132405-a56a62b18caf"],
    [/شوربة عدس جاهزة/, "photo-1547592180-85f173990554"],
    [/مايونيز|مستردة|مخلل خيار/, "photo-1472476443507-c7a5948772fc"],
    [/كاكاو خام|جوز هند مبشور/, "photo-1596040033229-a9821ebd058d"],
    [/تمر/, "photo-1587049352846-4a222e784d38"],
    [/طحينة/, "photo-1528750997573-59b89d56f4f7"],
    [/مناديل مبللة|أكياس ساندويتش/, "photo-1583947215259-38e31be8751f"]
  ];

  const match = imageRules.find(([pattern]) => pattern.test(name));

  const categoryImages = {
    "خضار وفاكهة": "photo-1542838132-92c53300491e",
    "ألبان وجبن": "photo-1563636619-e9143da7973b",
    "لحوم ودواجن": "photo-1607623814075-e51df1bdc82f",
    "مخبوزات": "photo-1509440159596-0249088772ff",
    "مشروبات": "photo-1600271886742-f049cd451bba",
    "سناكس ومعلبات": "photo-1621939514649-280e2aa2c2a1",
    "منظفات": "photo-1563453392212-326f5e854473",
    "عناية شخصية": "photo-1608248543803-ba4f8c70ae0b",
    "أرز ومكرونة": "photo-1586201375761-83865001e31c",
    "قهوة وشاي": "photo-1559056199-641a0ac8b55e",
    "مستلزمات منزلية": "photo-1583947215259-38e31be8751f",
    "فطار ومربى": "photo-1587049352846-4a222e784d38",
    "معلبات وصلصات": "photo-1547592180-85f173990554",
    "توابل ومستلزمات خبز": "photo-1596040033229-a9821ebd058d",
    "حبوب وشوفان": "photo-1517673132405-a56a62b18caf",
    "مجمدات": "photo-1630384060421-cb20d0e0649d",
    "بقوليات": "photo-1515543904379-3d757afe72e4",
    "أجبان ومقبلات": "photo-1486297678162-eb2a19b0a32d",
    "مستلزمات المطبخ": "photo-1585421514738-01798e348b17",
    "أغذية الأطفال": "photo-1517673132405-a56a62b18caf"
  };

  const fallback = match
    ? match[1]
    : categoryImages[product?.category] || "photo-1542838132-92c53300491e";

  return `https://images.unsplash.com/${fallback}?auto=format&fit=crop&w=${width}&q=85`;
};


const imageUrl = (id, width = 600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`;

function App() {
  const [dark, setDark] = useState(
    () => localStorage.getItem("seltak-theme") === "dark"
  );
  const [activeCategory, setActiveCategory] = useState("الكل");
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState({});
  const [favorites, setFavorites] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  const toggleTheme = () => {
    setDark((current) => {
      const next = !current;
      localStorage.setItem("seltak-theme", next ? "dark" : "light");
      return next;
    });
  };

  const visibleProducts = useMemo(() => {
    const normalizedSearch = search.trim().toLocaleLowerCase("ar");

    return products.filter((product) => {
      const matchesCategory =
        activeCategory === "الكل" || product.category === activeCategory;
      const matchesSearch = product.name
        .toLocaleLowerCase("ar")
        .includes(normalizedSearch);
      const matchesFavorite =
        !showFavorites || favorites.includes(product.id);

      return matchesCategory && matchesSearch && matchesFavorite;
    });
  }, [activeCategory, search, showFavorites, favorites]);

  const cartCount = Object.values(cart).reduce((sum, qty) => sum + qty, 0);
  const cartItems = products.filter((product) => cart[product.id] > 0);
  const cartTotal = cartItems.reduce(
    (sum, product) => sum + product.price * cart[product.id],
    0
  );

  const addToCart = (id) =>
    setCart((current) => ({
      ...current,
      [id]: (current[id] || 0) + 1,
    }));

  const changeQuantity = (id, amount) => {
    setCart((current) => {
      const next = { ...current };
      const qty = (next[id] || 0) + amount;

      if (qty <= 0) delete next[id];
      else next[id] = qty;

      return next;
    });
  };

  const removeFromCart = (id) => {
    setCart((current) => {
      const next = { ...current };
      delete next[id];
      return next;
    });
  };

  const toggleFavorite = (id) => {
    setFavorites((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  };

  const showAllProducts = () => {
    setActiveCategory("الكل");
    setSearch("");
    setShowFavorites(false);
  };

  const openFavorites = () => {
    setShowFavorites(true);
    setActiveCategory("الكل");
    setSearch("");
    setMobileMenu(false);
    document.getElementById("products")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <main className={dark ? "site dark" : "site"} dir="rtl">
      <div className="announcement">
        <Sparkles size={15} />
        <span>طازة لحد باب بيتك — تسوّق احتياجاتك اليومية بسهولة</span>
      </div>

      <header className="header">
        <a className="brand" href="#home" aria-label="سلتك - الرئيسية">
          <span className="brand-icon"><ShoppingCart size={27} /></span>
          <span>
            <strong>سِلّتك</strong>
            <small>كل طلبات البيت في مكان واحد</small>
          </span>
        </a>

        <div className="search-box">
          <Search size={19} />
          <input
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
              setShowFavorites(false);
            }}
            placeholder="ابحث عن منتجك المفضل..."
            aria-label="ابحث عن منتج"
          />
          {search && (
            <button
              className="clear-search"
              onClick={() => setSearch("")}
              aria-label="مسح البحث"
            >
              <X size={16} />
            </button>
          )}
        </div>

        <div className="header-actions">
          <button
            className="icon-button theme-toggle"
            onClick={toggleTheme}
            aria-label="تغيير الوضع"
          >
            {dark ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <button className="icon-button desktop-action" aria-label="حسابي">
            <UserRound size={21} />
            <span>حسابي</span>
          </button>

          <button
            className="icon-button desktop-action"
            onClick={openFavorites}
            aria-label="عرض المنتجات المفضلة"
          >
            <Heart size={21} />
            <span>
              المفضلة {favorites.length > 0 && `(${favorites.length})`}
            </span>
          </button>

          <button
            className="icon-button cart-button"
            onClick={() => setShowCart(true)}
            aria-label="سلة المشتريات"
          >
            <ShoppingCart size={22} />
            <span>السلة</span>
            <b className="cart-count">{cartCount}</b>
          </button>

          <button
            className="icon-button mobile-menu-button"
            onClick={() => setMobileMenu(!mobileMenu)}
            aria-label="القائمة"
          >
            {mobileMenu ? <X size={23} /> : <Menu size={23} />}
          </button>
        </div>
      </header>

      <nav className={`nav ${mobileMenu ? "nav-open" : ""}`}>
        <a className="nav-active" href="#home" onClick={() => setMobileMenu(false)}>الرئيسية</a>
        <a href="#categories" onClick={() => setMobileMenu(false)}>الأقسام</a>
        <a href="#offers" onClick={() => setMobileMenu(false)}>عروض اليوم</a>
        <a href="#products" onClick={() => setMobileMenu(false)}>المنتجات</a>
        <a href="#delivery" onClick={() => setMobileMenu(false)}>التوصيل</a>
      </nav>

      <section className="hero" id="home">
        <div className="hero-copy">
          <motion.span
            className="eyebrow"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Leaf size={17} /> طازة كل يوم
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            أطعمة طازجة
            <br />
            <span>لحياة أفضل</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
          >
            من المزرعة لباب بيتك.. كل ما تحتاجه وأكثر
          </motion.p>

          <motion.a
            className="primary-button"
            href="#products"
            whileHover={{ scale: 1.04, y: -3 }}
            whileTap={{ scale: 0.97 }}
          >
            تسوّق الآن <ArrowLeft size={18} />
          </motion.a>

          <div className="hero-points">
            <span><ShieldCheck size={16} /> جودة مضمونة</span>
            <span><Truck size={16} /> توصيل سريع</span>
          </div>
        </div>

        <motion.div
          className="hero-image-wrap"
          initial={{ opacity: 0, scale: 0.78, rotate: -5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.1, ease: "easeOut" }}
        >
          <motion.div
            className="hero-orbit orbit-one"
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="hero-orbit orbit-two"
            animate={{ rotate: -360 }}
            transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
          />
          <motion.img
            className="hero-produce"
            src={imageUrl("photo-1542838132-92c53300491e", 1000)}
            alt="خضروات وفاكهة طازجة"
            animate={{ y: [0, -12, 0], rotate: [0, 1.5, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            onError={(event) => {
              event.currentTarget.onerror = null;
              event.currentTarget.src = "https://placehold.co/900x700/F3F5EF/52634A?text=Fresh+Produce";
            }}
          />
          <motion.div
            className="floating-note note-top"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <span>🌿</span>
            <div><strong>طازة يوميًا</strong><small>من أفضل المزارع</small></div>
          </motion.div>
          <motion.div
            className="floating-note note-bottom"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 4.5, repeat: Infinity }}
          >
            <span>🚚</span>
            <div><strong>توصيل سريع</strong><small>لحد باب بيتك</small></div>
          </motion.div>
        </motion.div>

        <div className="hero-side-label">اختياراتك الأفضل دائمًا <span>♥</span></div>
        <div className="hero-decoration decor-one">✳</div>
        <div className="hero-decoration decor-two">✳</div>
      </section>

      <section className="category-section section-wrap" id="categories">
        <div className="section-heading">
          <div>
            <span className="section-kicker">اختار اللي محتاجه</span>
            <h2>تسوّق حسب القسم</h2>
          </div>
          <span className="section-caption">كل احتياجاتك في مكان واحد</span>
        </div>

        <div className="category-list">
          {categories.slice(1).map((category, index) => (
            <motion.button
              key={category.name}
              className={`category-card category-${index} ${
                activeCategory === category.name ? "selected" : ""
              }`}
              onClick={() => {
                setActiveCategory(category.name);
                setShowFavorites(false);
                document.getElementById("products")?.scrollIntoView({
                  behavior: "smooth",
                });
              }}
              whileHover={{ y: -8, scale: 1.025 }}
              whileTap={{ scale: 0.97 }}
            >
              <span className="category-emoji">{category.emoji}</span>
              <strong>{category.name}</strong>
              <span className="category-arrow"><ArrowLeft size={15} /></span>
            </motion.button>
          ))}
        </div>
      </section>

      <section className="offers-section section-wrap" id="offers">
        <motion.div
          className="offer-card offer-green"
          initial={{ opacity: 0, x: -25 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6 }}
        >
          <div className="offer-copy">
            <span className="offer-tag">اختيارات عليها خصومات</span>
            <h2>عروض اليوم</h2>
            <p>اكتشف المنتجات التي لها أسعار سابقة ووفّر في مشترياتك.</p>
            <a
              href="#products"
              onClick={() => {
                setActiveCategory("الكل");
                setShowFavorites(false);
              }}
            >
              شاهد المنتجات <ArrowLeft size={16} />
            </a>
          </div>
          <motion.div
            className="offer-art offer-fruit"
            animate={{ y: [0, -7, 0], rotate: [0, 2, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
          >
            🍓
          </motion.div>
        </motion.div>

        <motion.div
          className="offer-card offer-peach"
          initial={{ opacity: 0, x: 25 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6 }}
        >
          <div className="offer-copy">
            <span className="offer-tag">تشكيلة أوسع</span>
            <h2>منتجات جديدة</h2>
            <p>اكتشف أقسام الفطار والمعلبات والتوابل والحبوب.</p>
            <a
              href="#products"
              onClick={() => {
                setActiveCategory("الكل");
                setShowFavorites(false);
              }}
            >
              اكتشف المنتجات <ArrowLeft size={16} />
            </a>
          </div>
          <motion.div
            className="offer-art offer-bowl"
            animate={{ y: [0, -9, 0], rotate: [0, -3, 0] }}
            transition={{ duration: 5.5, repeat: Infinity }}
          >
            🥗
          </motion.div>
        </motion.div>
      </section>

      <section className="products-section section-wrap" id="products">
        <div className="section-heading">
          <div>
            <span className="section-kicker">اختيارات مميزة ليك</span>
            <h2>
              {showFavorites
                ? "منتجاتي المفضلة"
                : search
                  ? "نتائج البحث"
                  : activeCategory === "الكل"
                    ? "منتجات سِلّتك"
                    : activeCategory}
            </h2>
          </div>

          <button className="view-all" onClick={showAllProducts}>
            عرض الكل <ArrowLeft size={16} />
          </button>
        </div>

        <div className="product-filter">
          {categories.map((category) => (
            <button
              key={category.name}
              className={
                activeCategory === category.name && !showFavorites
                  ? "filter-active"
                  : ""
              }
              onClick={() => {
                setActiveCategory(category.name);
                setShowFavorites(false);
              }}
            >
              {category.name}
            </button>
          ))}
        </div>

        {visibleProducts.length > 0 ? (
          <div className="product-grid">
            {visibleProducts.map((product, index) => (
              <motion.article
                className="product-card"
                key={product.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.45, delay: (index % 4) * 0.07 }}
                whileHover={{ y: -6 }}
              >
                <div
                  className="product-image"
                  style={{ backgroundColor: product.color }}
                >
                  <img
                    src={productImageUrl(product)}
                    alt={product.name}
                    loading="lazy"
                    onError={(event) => {
                      event.currentTarget.onerror = null;
                      event.currentTarget.src =
                        `https://placehold.co/600x600/F3F5EF/52634A?text=${encodeURIComponent(
                          product.name
                        )}`;
                    }}
                  />

                  {product.oldPrice && (
                    <span className="product-discount">
                      -{Math.round((1 - product.price / product.oldPrice) * 100)}%
                    </span>
                  )}

                  <button
                    className={`favorite-button ${
                      favorites.includes(product.id) ? "is-favorite" : ""
                    }`}
                    onClick={() => toggleFavorite(product.id)}
                    aria-label={
                      favorites.includes(product.id)
                        ? "إزالة من المفضلة"
                        : "إضافة للمفضلة"
                    }
                  >
                    <Heart
                      size={18}
                      fill={
                        favorites.includes(product.id)
                          ? "currentColor"
                          : "none"
                      }
                    />
                  </button>
                </div>

                <div className="product-info">
                  <span className="product-category">{product.category}</span>
                  <h3>{product.name}</h3>
                  <p className="product-detail">{product.detail}</p>

                  <div className="product-rating">
                    <Star size={15} fill="currentColor" /> {product.rating}
                  </div>

                  <div className="price-row">
                    <strong>{product.price} <small>ج.م</small></strong>
                    {product.oldPrice && (
                      <del>{product.oldPrice} ج.م</del>
                    )}
                  </div>

                  <motion.button
                    className="add-button"
                    onClick={() => addToCart(product.id)}
                    whileTap={{ scale: 0.96 }}
                  >
                    <Plus size={17} /> أضف إلى السلة
                    {cart[product.id] > 0 && (
                      <span className="added-qty">{cart[product.id]}</span>
                    )}
                  </motion.button>
                </div>
              </motion.article>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <Search size={35} />
            <h3>
              {showFavorites
                ? "لسه مفيش منتجات في المفضلة"
                : "ملقيناش المنتج ده"}
            </h3>
            <p>
              {showFavorites
                ? "اضغط على علامة القلب في أي منتج لإضافته هنا."
                : "جرّب اسم تاني أو اختار قسم مختلف."}
            </p>
            <button className="primary-button" onClick={showAllProducts}>
              عرض كل المنتجات
            </button>
          </div>
        )}
      </section>

      <motion.section
        className="delivery-banner section-wrap"
        id="delivery"
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="delivery-copy">
          <span className="section-kicker">تجربة تسوّق أسهل</span>
          <h2>كل اللي بيتك محتاجه.. في سِلّتك</h2>
          <p>اختيارات متنوعة، أسعار تجريبية، وتجربة تسوّق بسيطة.</p>
          <a href="#products" className="primary-button">
            ابدأ التسوق <ArrowLeft size={17} />
          </a>
        </div>

        <motion.div
          className="delivery-illustration"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          🛒🥬🍊
        </motion.div>

        <div className="delivery-benefits">
          <div>
            <Truck />
            <span><strong>توصيل سريع</strong><small>تجربة توصيل تجريبية</small></span>
          </div>
          <div>
            <ShieldCheck />
            <span><strong>تسوّق بأمان</strong><small>واجهة سهلة ومريحة</small></span>
          </div>
          <div>
            <Leaf />
            <span><strong>منتجات متنوعة</strong><small>اختيارات يومية</small></span>
          </div>
        </div>
      </motion.section>

      <footer className="footer">
        <div className="footer-main section-wrap">
          <div className="footer-brand">
            <a className="brand" href="#home">
              <span className="brand-icon"><ShoppingCart size={27} /></span>
              <span>
                <strong>سِلّتك</strong>
                <small>كل طلبات البيت في مكان واحد</small>
              </span>
            </a>
            <p>تجربة تسوّق يومية أسهل وأقرب ليك.</p>
          </div>

          <div className="footer-column">
            <h4>روابط مهمة</h4>
            <a href="#home">الرئيسية</a>
            <a href="#categories">الأقسام</a>
            <a href="#offers">عروض اليوم</a>
          </div>

          <div className="footer-column">
            <h4>خدمة العملاء</h4>
            <a href="#delivery">التوصيل</a>
            <a href="#products">المنتجات</a>
            <a href="mailto:hello@seltak.example">تواصل معنا</a>
          </div>

          <div className="footer-column">
            <h4>تابعنا</h4>
            <div className="social-links">
              <span>f</span><span>◎</span><span>▶</span>
            </div>
          </div>
        </div>

        <div className="footer-bottom section-wrap">
          <span>© 2026 سِلّتك — جميع الحقوق محفوظة</span>
          <span>صُنع بحب لبيتك ♥</span>
        </div>
      </footer>

      <AnimatePresence>
        {showCart && (
          <motion.div
            className="cart-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowCart(false)}
          >
            <motion.aside
              className="cart-drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="cart-drawer-header">
                <div>
                  <h2>سلة مشترياتك</h2>
                  <p>{cartCount} قطعة في السلة</p>
                </div>
                <button
                  className="icon-button"
                  onClick={() => setShowCart(false)}
                  aria-label="إغلاق السلة"
                >
                  <X />
                </button>
              </div>

              {cartItems.length === 0 ? (
                <div className="cart-empty">
                  <ShoppingCart size={46} />
                  <h3>سلتك لسه فاضية</h3>
                  <p>اختار منتجاتك المفضلة وابدأ التسوق.</p>
                  <button
                    className="primary-button"
                    onClick={() => setShowCart(false)}
                  >
                    تسوّق الآن
                  </button>
                </div>
              ) : (
                <>
                  <div className="cart-items">
                    {cartItems.map((product) => (
                      <div className="cart-item" key={product.id}>
                        <img
                          src={productImageUrl(product, 200)}
                          alt={product.name}
                          loading="lazy"
                          onError={(event) => {
                            event.currentTarget.onerror = null;
                            event.currentTarget.src =
                              `https://placehold.co/200x200/F3F5EF/52634A?text=${encodeURIComponent(
                                product.name
                              )}`;
                          }}
                        />

                        <div className="cart-item-info">
                          <strong>{product.name}</strong>
                          <span>{product.price} ج.م</span>

                          <div className="quantity-control">
                            <button
                              onClick={() => changeQuantity(product.id, -1)}
                              aria-label="تقليل الكمية"
                            >
                              <Minus size={14} />
                            </button>
                            <b>{cart[product.id]}</b>
                            <button
                              onClick={() => changeQuantity(product.id, 1)}
                              aria-label="زيادة الكمية"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                        </div>

                        <button
                          className="remove-item"
                          onClick={() => removeFromCart(product.id)}
                          aria-label="حذف المنتج"
                        >
                          <Trash2 size={17} />
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="cart-summary">
                    <div>
                      <span>الإجمالي</span>
                      <strong>{cartTotal.toLocaleString("ar-EG")} ج.م</strong>
                    </div>
                    <p>الأسعار تجريبية، والطلب لا يُرسل إلى متجر حقيقي.</p>
                    <button
                      className="primary-button"
                      onClick={() =>
                        alert(
                          "دي تجربة Front-End؛ إتمام الطلب الحقيقي يحتاج Backend."
                        )
                      }
                    >
                      متابعة الطلب <ArrowLeft size={18} />
                    </button>
                  </div>
                </>
              )}
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

export default App;
