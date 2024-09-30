PGDMP                      |            mydb    16.4    16.4                0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    16397    mydb    DATABASE     v   CREATE DATABASE mydb WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Thai_Thailand.874';
    DROP DATABASE mydb;
                postgres    false                        2615    16818    public    SCHEMA     2   -- *not* creating schema, since initdb creates it
 2   -- *not* dropping schema, since initdb creates it
                postgres    false                       0    0    SCHEMA public    COMMENT         COMMENT ON SCHEMA public IS '';
                   postgres    false    5                       0    0    SCHEMA public    ACL     +   REVOKE USAGE ON SCHEMA public FROM PUBLIC;
                   postgres    false    5            W           1247    16861    TenantStatus    TYPE     ]   CREATE TYPE public."TenantStatus" AS ENUM (
    'PENDING',
    'APPROVED',
    'REJECTED'
);
 !   DROP TYPE public."TenantStatus";
       public          postgres    false    5            �            1259    16828    Product    TABLE     �  CREATE TABLE public."Product" (
    id text NOT NULL,
    name text NOT NULL,
    detail text,
    price integer,
    location text,
    file text DEFAULT 'noimage.jpg'::text NOT NULL,
    "tenantId" text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    status text DEFAULT 'ว่าง'::text NOT NULL
);
    DROP TABLE public."Product";
       public         heap    postgres    false    5            �            1259    16837    Tenant    TABLE     f  CREATE TABLE public."Tenant" (
    id text NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    phone text NOT NULL,
    message text,
    slip text,
    "startDate" timestamp(3) without time zone NOT NULL,
    "endDate" timestamp(3) without time zone NOT NULL,
    status public."TenantStatus" DEFAULT 'PENDING'::public."TenantStatus" NOT NULL
);
    DROP TABLE public."Tenant";
       public         heap    postgres    false    855    855    5            �            1259    16846    User    TABLE     �   CREATE TABLE public."User" (
    id text NOT NULL,
    name text NOT NULL,
    password text,
    role text DEFAULT 'user'::text NOT NULL
);
    DROP TABLE public."User";
       public         heap    postgres    false    5            �            1259    16819    _prisma_migrations    TABLE     �  CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);
 &   DROP TABLE public._prisma_migrations;
       public         heap    postgres    false    5            �          0    16828    Product 
   TABLE DATA           z   COPY public."Product" (id, name, detail, price, location, file, "tenantId", "createdAt", "updatedAt", status) FROM stdin;
    public          postgres    false    216   �       �          0    16837    Tenant 
   TABLE DATA           i   COPY public."Tenant" (id, name, email, phone, message, slip, "startDate", "endDate", status) FROM stdin;
    public          postgres    false    217   �                  0    16846    User 
   TABLE DATA           :   COPY public."User" (id, name, password, role) FROM stdin;
    public          postgres    false    218          �          0    16819    _prisma_migrations 
   TABLE DATA           �   COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
    public          postgres    false    215   �       h           2606    16836    Product Product_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public."Product"
    ADD CONSTRAINT "Product_pkey" PRIMARY KEY (id);
 B   ALTER TABLE ONLY public."Product" DROP CONSTRAINT "Product_pkey";
       public            postgres    false    216            j           2606    16845    Tenant Tenant_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public."Tenant"
    ADD CONSTRAINT "Tenant_pkey" PRIMARY KEY (id);
 @   ALTER TABLE ONLY public."Tenant" DROP CONSTRAINT "Tenant_pkey";
       public            postgres    false    217            l           2606    16854    User User_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);
 <   ALTER TABLE ONLY public."User" DROP CONSTRAINT "User_pkey";
       public            postgres    false    218            f           2606    16827 *   _prisma_migrations _prisma_migrations_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);
 T   ALTER TABLE ONLY public._prisma_migrations DROP CONSTRAINT _prisma_migrations_pkey;
       public            postgres    false    215            m           2606    16855    Product Product_tenantId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Product"
    ADD CONSTRAINT "Product_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES public."Tenant"(id) ON UPDATE CASCADE ON DELETE SET NULL;
 K   ALTER TABLE ONLY public."Product" DROP CONSTRAINT "Product_tenantId_fkey";
       public          postgres    false    216    217    4714            �   �  x���J\1ǯw������y�>�7�S�E��"��޵֮Am�j[r�&��d�]܏�� ,����f�ߙ���eR*RXˉ�ΒRV��[U*&�ƕ��/C�>������,����?��e�7�������f%�����y�l}<��6}��.�7�ehz�Z#t0V|�z>3=�In��[La�3���C��D]�m���(�e���:��n�瓵���Y�4�w������deI��8 �0�[�<٭)����7�j;f�õ����`����6t��_J2��ߞ����D���=Y�+|ݡ�`�+�uiU�v���ppo�c�y�[a��F	 MU	��v����'�P��"�&g�kK��s�Z�LS�T/E��D�a�6���FE%Z��0�$ZΊR�B��XN;p��R.����
�)��9Vr9�`�3\�G`�	`���� �����+m�M����H�\���G��LR 9�������i�UT�D%Q��jtS;OD��?�s�����7Dm�OWsU0.��	�������B9mLﺊ�'I�xp�.�2�s�+�̊�03���t�����7�K��� 	0?8р�uÕ������>���p���w���¸���qXƸ�`�/tO�)-e�I#O0�9ԙ�j�r`�gi϶j9�6��J���"�g͌�NY]�����E�7��3���v�7jU*�ۑ�R+%�L��R-�Zr�3K��=@�:�A7W7i���^��      �   V  x��ѻJdA��S�5TW_�HaDLf��L�r�8ꌂ�.j���"F�&F=oӏ���0EG?��߹����uN��� ��@�ء���"�l:gi?L�g�`c2ӣA:�	�Ȋ<�7��AJ@����|^2��m��?�n�3�8Gt��E�Cי�ҵf�_��ӳ�0?d�]a@��Oc`O���]K�S�}&`�\06j�F��.nj�_���&�5�Y���}��"�boἍp8oS�����%�W�t�@m��X� ��z(3xjt��j�������ߵ�/���潓��#�Ⲗ�uq]����j�U�C-w�T��?P�e��pg�����y'ު�          �   x�5��N�0 �k��{�鱽�`3�B6�oJi	�����7����	�8Y"�
��Q��蜴>���7�(�6k,·��2��]�j�ܭ�S��j3�Y�����2�Kت��˯���`J���r��pBp�m��9�F+`"��Wc��t�̓�ڗt'��������%?�C:�Y-�U/����l��g2��{Jc?�A      �   Q  x���mnG�˧��b�3�!s�� ��rul�r�_�V�8���� i��.��<�X����bR1�QP�a�͍v�Ϻ\��ak�i5�2xb�ֻa�)6̐�v��c�>P+���Ϥ�k�Ta�h�x���7䣹�v~z<����n�χ�_�_�]�D�����M����^¥�S�|��8�&;$�����qŠH�u&��R��$K�E���'Ȏ<fi�ާA��+���x<����8�>�)�~�����~ݧ����c�>@�U	�W��8����T�Ut�Zp2����h��2}8��i�^6���#�N�]!�mS�Mjv��Q�RG��׷���0t�+C��K�U�(m-X-l�=tw�:c��b�i�ʵ���j���.�::�֚�T�W�`��ctj��g!���2��/bH--]�s�r���{o��F.8g�٢K����ڱ�)H8�jPW�1�K+�#���l��"�߰ao�q:_p^X��|{�����Ç`�T^�(v
,�j+m�\�.e��Q�f80Sh�b�!�]ۄ:��
�Pv*��W�l����q�4h\���S �?��n�>��K������$/�+�r&��(3(ۃ��{� S�{n���9�թ�a�y�"�Y�V.#�r+�7_�jY,o�R��b���D�"�70e�+���=�Ԯ%$��Hk#?4���'�h"��C�1
 e5�Dl��Y+lk����F�5l�^��i��@��}��[�?���i}���"PSU1�&�@�JŘ{��F���C�	(�f�4F��!��kCSL���s��=���sY��J�H�o,���0��#�맛���6�[     